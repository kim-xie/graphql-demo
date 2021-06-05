/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useRef } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
	COMPANY_LIST,
	USER_LIST,
	DELETE_USER,
	ADD_USER,
	UPDATE_USER,
} from '../api'
import './graphql.css'

function AddUser(props) {
	const nameRef = useRef()
	const selectRef = useRef()
	if (props.data) {
		nameRef.current.value = props.data.name
		selectRef.current.value = props.data.company.id
	}
	const [isInValide, setIsInValide] = useState(false)
	const { loading: queryLoading, data } = useQuery(COMPANY_LIST)
	const [addUser, { loading: mutationLoading }] = useMutation(ADD_USER)
	const [updateUser] = useMutation(UPDATE_USER)
	return (
		<>
			{queryLoading && <p>queryLoading...</p>}
			{mutationLoading && <p>mutationLoading...</p>}
			<form
				onSubmit={async (e) => {
					e.preventDefault()
					const { name, companyId } = e.target
					if (!name.value) {
						setIsInValide(true)
						return
					}
					setIsInValide(false)
					if (props.type === 'edit') {
						await updateUser({
							variables: {
								id: props.data.id,
								companyId: companyId.value,
								name: name.value,
							},
							refetchQueries: props.queryList,
						})
					} else {
						await addUser({
							variables: { companyId: companyId.value, name: name.value },
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
							placeholder="请输入用户名"
						/>
						<div className="invalid-feedback">用户名不能为空</div>
					</div>
					<div className="form-group mt-3">
						<select ref={selectRef} className="form-select" id="companyId">
							{data &&
								data.companies.data.map(({ id, name }) => (
									<option key={id} value={id}>
										{name}
									</option>
								))}
						</select>
					</div>
					<button type="submit" className="btn btn-primary mt-4">
						{props.type === 'edit' ? '确认' : '新增'}
					</button>
				</fieldset>
			</form>
		</>
	)
}

function UserList() {
	const editRef = useRef()
	const [visableModal, setVisableModal] = useState(false)
	const [offset, setOffset] = useState(0)
	const [limit, setLimit] = useState(5)
	const { loading: queryLoading, error, data, refetch } = useQuery(
		USER_LIST,
		{
			variables: {
				offset,
				limit,
			},
		}
	)
	const [deleteUser, { loading: mutationLoading }] = useMutation(DELETE_USER)

	const handleDelete = async (id) => {
		await deleteUser({ variables: { id } })
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
			<h3 className="card-header">Apollo client react demo</h3>
			<AddUser
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
							<th scope="col">userName</th>
							<th scope="col">company</th>
							<th scope="col">operate</th>
						</tr>
					</thead>
					<tbody>
						{data?.users?.data?.map(({ id, name, company }) => (
							<tr className="table-light" key={id}>
								<td>{id}</td>
								<td>{name}</td>
								<td>{company.name}</td>
								<td>
									<button
										type="button"
										className="btn btn-secondary btn-sm mr-3"
										onClick={() => handleEdit({ id, name, company })}
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
				<p className="mr-5">共{data.users.total}条数据</p>
				{data.users.total ? (
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
						{new Array(Math.ceil(data.users.total / limit))
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
								offset >= Math.ceil(data.users.total / limit) - 1 && 'disabled'
							}`}
							onClick={
								offset >= Math.ceil(data.users.total / limit) - 1
									? undefined
									: () => {
											refetch({
                          offset: offset + (limit-1),
                          limit
											}).then((res) => {
												setOffset((offset) => offset + (limit-1))
											})
									  }
							}
						>
							<a className="page-link" href="#">
								&raquo;
							</a>
						</li>
					</ul>
				):null}
			</div>

			<div
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
							<AddUser
								type="edit"
								data={editRef.current}
								handleClose={() => {
									editRef.current = null
									setVisableModal(false)
								}}
							></AddUser>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserList
