/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
	COMPANY_LIST,
	DELETE_COMPANY,
	ADD_COMPANY,
	UPDATE_COMPANY,
} from '../api'
import './graphql.css'

function AddCompany(props) {
	const nameRef = useRef()
	const [isInValide, setIsInValide] = useState(false)
	const [addCompany, { loading: mutationLoading }] = useMutation(ADD_COMPANY)
  const [updateCompany] = useMutation(UPDATE_COMPANY)
  useEffect(() => {
    if (props.data) {
      nameRef.current.value = props.data.name
    }
  },[props.data])
	return (
		<>
			{mutationLoading && <p>mutationLoading...</p>}
			<form
				onSubmit={async (e) => {
					e.preventDefault()
					const { name } = e.target
					if (!name.value) {
						setIsInValide(true)
						return
					}
          setIsInValide(false)
          
					if (props.type === 'edit') {
						await updateCompany({
							variables: {
								id: props.data.id,
                name: name.value
							},
							refetchQueries: props.queryList,
						})
					} else {
						await addCompany({
							variables: { name: name.value },
							refetchQueries: props.queryList,
						})
					}
					name.value = ''
					props.handleClose && props.handleClose()
				}}
			>
				<fieldset>
					<div className={`form-group ${isInValide ? 'has-danger' : ''}`}>
						<input
							ref={nameRef}
							id="name"
							type="text"
							className={`form-control mt-3 ${isInValide ? 'is-invalid' : ''}`}
							placeholder="请输入公司名称"
						/>
						<div className="invalid-feedback">公司名称不能为空</div>
					</div>
					<button type="submit" className="btn btn-primary mt-4">
						{props.type === 'edit' ? '确认' : '新增'}
					</button>
				</fieldset>
			</form>
		</>
	)
}

function CompanyList() {
	const editRef = useRef()
	const [visableModal, setVisableModal] = useState(false)
	const [offset, setOffset] = useState(0)
	const limit = 10
	const { loading: queryLoading, error, data, refetch } = useQuery(
		COMPANY_LIST,
		{
			variables: {
				offset,
				limit,
			},
		}
	)
	const [deleteCompany, { loading: mutationLoading }] = useMutation(DELETE_COMPANY)

	const handleDelete = async (id) => {
		await deleteCompany({ variables: { id } })
    refetch({
      offset: 0,
      limit,
    }).then((res) => {
      setOffset(0)
    })
	}

	const handleEdit = (row) => {
		console.log('handleEdit', row)
		editRef.current = row
		setVisableModal(true)
	}

	if (queryLoading) return <p>Loading...</p>
	if (error) return <p>`Error! ${error}`(</p>

	return (
		<div className="container card mt-5 mb-3">
			<h3 className="card-header">Apollo client react demo company list</h3>
			<AddCompany
				queryList={() =>
					refetch({
            offset: 0,
            limit
					}).then((res) => {
						setOffset(0)
					})
				}
			/>
			<div className="card mt-5 mb-1">
				{mutationLoading && <div className="loading">delete ing....</div>}
				<table className="table table-hover">
					<thead>
						<tr>
							<th scope="col">ID</th>
							<th scope="col">company</th>
              <th scope="col">users</th>
							<th scope="col">operate</th>
						</tr>
					</thead>
					<tbody>
						{data?.companies?.data?.map(({ id, name, users }) => (
							<tr className="table-light" key={id}>
								<td>{id}</td>
								<td>{name}</td>
                <td>{users?.map(item=>item.name).join(',')||'-'}</td>
								<td>
									<button
										type="button"
										className="btn btn-secondary btn-sm mr-3"
										onClick={() => handleEdit({ id, name, users })}
									>
										编辑
									</button>
									<button
										type="button"
										className="btn btn-danger btn-sm ml-5"
										onClick={() => handleDelete(id)}
									>
										删除
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="pagination-wrap">
				<p className="mr-5">共{data?.companies?.total}条数据</p>
				{data?.users?.total && (
					<ul className="pagination">
						<li
							className={`page-item ${offset <= 0 && 'disabled'}`}
							onClick={
								offset <= 0
									? undefined
									: () => {
											refetch({
                          offset: offset - limit,
                          limit
											}).then((res) => {
												setOffset((offset) => offset - limit)
											})
									  }
							}
						>
							<a className="page-link" href="#">
								&laquo;
							</a>
						</li>
						{new Array(Math.ceil(data.companies.total / limit))
							.fill(1)
							.map((item, index) => {
								console.log('offset limit', offset, limit)
								return (
									<li
										key={index}
										className={`page-item ${
											Math.floor(offset / limit) === index && 'active'
										}`}
										onClick={() => {
											refetch({
                          offset: index * limit,
                          limit
											}).then((res) => {
												setOffset(index * limit)
											})
										}}
									>
										<a className="page-link" href="#">
											{index + 1}
										</a>
									</li>
								)
							})}

						<li
							className={`page-item ${
								offset >= Math.ceil(data.companies.total / limit) - 1 && 'disabled'
							}`}
							onClick={
								offset >= Math.ceil(data.companies.total / limit) - 1
									? undefined
									: () => {
											refetch({
                          offset: offset + limit,
                          limit
											}).then((res) => {
												setOffset((offset) => offset + limit)
											})
									  }
							}
						>
							<a className="page-link" href="#">
								&raquo;
							</a>
						</li>
					</ul>
				)}
			</div>

      {
        visableModal && <div
        className="modal"
        style={{ display: visableModal ? 'block' : 'none' }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">编辑信息</h5>
              <button
                onClick={() => {
                  editRef.current = null
                  setVisableModal(false)
                }}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
              <AddCompany
                type="edit"
                data={editRef.current}
                handleClose={() => {
                  editRef.current = null
                  setVisableModal(false)
                }}
              ></AddCompany>
            </div>
          </div>
        </div>
      </div>
      }
			
		</div>
	)
}

export default CompanyList
