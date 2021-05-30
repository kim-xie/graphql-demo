import {useState, useEffect, useRef} from 'react'
import cx from 'classnames'
import './index.css'

const Index = () => {
  const [active,setActive] = useState(true)
  const [list,setList] = useState(null)
  
  useEffect(() => {
    let newArr = []
    for(let i=1; i<10; i++){
      newArr.push(i)
    }
    
    setList(newArr)

    const dataList = {
      1: {
        status: 1,
        createTM: 2
      },
      
      3: {
        status: 2,
        createTM: 4,
        publishTime: 2
      },
      2: {
        status: 2,
        createTM: 3,
        publishTime: 3
      },
      4: {
        status: 1,
        createTM: 1
      },
      5: {
        status: 2,
        createTM: 3,
        publishTime: 1
      },
      6: {
        status: 1,
        createTM: 6
      }
    }

    const dataArr = Object.keys(dataList).map((item) => {
      return dataList[item]
    })

    console.log('dataArr',dataArr)

    /**
      实时发布放到最前面
      都是实时发布看创建时间
      定时发布看发布时间
     */
    for(let i=1; i<dataArr.length; i++){
      // 定时发布
      if(dataArr[i].publishTime){
        // 前一个也是定时发布，比较发布时间
        if(dataArr[i-1].publishTime){
          let temp = dataArr[i];  
          // 从当前位置开始处理
          let j = i;  
          // 比较创建时间
          while (j > 0 && temp.publishTime < dataArr[j - 1].publishTime) {  
            dataArr[j] = dataArr[j - 1];  
            j--;    // 填充完后, 继续向前比较 
          }  
          // 将temp放在属于它的位置上
          dataArr[j] = temp; 
        }
      }else{
        // 实时发布
        // 前一个也是实时发布
        if(!dataArr[i-1].publishTime){
          let temp = dataArr[i];  
          // 从当前位置开始处理
          let j = i;  
          // 比较创建时间
          while (j > 0 && temp.createTM < dataArr[j - 1].createTM) {  
            dataArr[j] = dataArr[j - 1];  
            j--;    // 填充完后, 继续向前比较 
          }  
          // 将temp放在属于它的位置上
          dataArr[j] = temp; 
        }else{
          // 前一个是定时发布
          let temp = dataArr[i];  
          // 从当前位置开始处理
          let j = i;  
          // 比较创建时间
          while (j > 0 && (dataArr[j - 1].publishTime || (!dataArr[j - 1].publishTime && temp.createTM < dataArr[j - 1].createTM))) {  
            dataArr[j] = dataArr[j - 1];  
            j--;    // 填充完后, 继续向前比较 
          }  
          // 将temp放在属于它的位置上
          dataArr[j] = temp;
        }
      }
      // 实时发布放到最前
      // if(dataArr[i].status === 1){
      //   // 前一个是实时发布则比较创建时间
      //   if(dataArr[i-1].status === 1){
      //     // 临时变量存储array[i]的值
      //     let temp = dataArr[i];  
      //     // 从当前位置开始处理
      //     let j = i;  
      //     // 将比temp大的数往后挪一个位置，为temp腾出一个合适位置
      //     while (j > 0 && temp.createTM < dataArr[j - 1].createTM) {  
      //       dataArr[j] = dataArr[j - 1];  
      //       j--;    // 填充完后, 继续向前比较 
      //     }  
      //     // 将temp放在属于它的位置上
      //     dataArr[j] = temp;  
      //   }else{
      //     // 临时变量存储array[i]的值
      //     let temp = dataArr[i];  
      //     // 从当前位置开始处理
      //     let j = i;  
      //     // 将比temp大的数往后挪一个位置，为temp腾出一个合适位置
      //     while (j > 0 && (dataArr[j - 1].status === 2 || (dataArr[j - 1].status === 1 && temp.createTM < dataArr[j - 1].createTM))) {  
      //       dataArr[j] = dataArr[j - 1];  
      //       j--;    // 填充完后, 继续向前比较 
      //     }  
      //     // 将temp放在属于它的位置上
      //     dataArr[j] = temp;  
      //   }
      // }else{
      //   if(dataArr[i-1].status === 2){
      //     // 临时变量存储array[i]的值
      //     const temp = dataArr[i];  
      //     // 从当前位置开始处理
      //     let j = i;  
      //     // 将比temp大的数往后挪一个位置，为temp腾出一个合适位置
      //     while (j > 0 && temp.createTM < dataArr[j - 1].createTM) {  
      //       dataArr[j] = dataArr[j - 1];  
      //       j--;    // 填充完后, 继续向前比较 
      //     }  
      //     // 将temp放在属于它的位置上
      //     dataArr[j] = temp;  
      //   }
      // }
    }

    // console.log('dataArr2',dataArr)

    // let results = dataArr.reduce((prev,cur,i,data) => {
    //   console.log('prev1',prev,cur,i,data)
    //   if(i>0){
    //     while()
    //     prev.forEach(element => {
    //       if(cur.status === 1){
    //         if(element.status === 1 && cur.createTM < element.createTM){
    //           prev.concat(cur)
    //         }else{
    //           prev.splice(i-1,0,cur)
    //           throw 'err'
    //         }
    //       }else{
    //         if(element.status === 2 && cur.createTM < element.createTM){
    //           prev.splice(i,0,cur)
    //           throw 'err'
    //         }else{
    //           prev.splice(i-1,0,cur)
    //           throw 'err'
    //         }
    //       }
          
    //     });
    //   }else{
    //     prev = prev.concat([cur])
    //   }
      
    //   console.log('prev2',prev)
    //   return prev
    // },[])

    // console.log('results',results)

    

  },[])

  const handleAnimationEnd = () => {
    const firstItem = list.shift()
    const newList = list.concat(firstItem)
    setList(newList)
    setActive(false)
    setTimeout(() => {
      setActive(true)
    },2000)
  }

  return <div className="listWrap">
    <ul 
      className={cx("list-wrap",active?'active':'unActive')} 
      onAnimationEnd={handleAnimationEnd}
    >
      { list && list.map((item,idx) => {
          return <li key={item} className="list-item" >{item}</li>
        })
      }
    </ul>
  </div>
}

export default Index