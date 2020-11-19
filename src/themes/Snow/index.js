    import React from 'react'


 function ThemeSnow() {

    const [isSnow,setSnow] = React.useState(false);
    React.useEffect(()=>{
                let s = setTimeout(()=>{
                    setSnow(true);
                },10000) 

                return ()=>{
                    clearTimeout(s)
                }
    },[])
     const renderSnows = React.useCallback (()=>{
         return [...Array(21)].map((snow,index)=>{
               return   <img style={{animationName:index %2 !== 0 ? "bounce":"bounce2"}} className={`ball${index}`} style={{animationDelay:"4s"}} key={index} src={'https://tix.vn/app/assets/img/noel/2018/snowflake_1.png'} /> 
         })
     },[]);
    
     const renderSnows1 = React.useCallback(()=>{
        return [...Array(21)].map((snow,index)=>{
            return   <img style={{animationName:index %2 !== 0 ? "bounce":"bounce2"}} className={`balls${index}`} key={index} src={'https://tix.vn/app/assets/img/noel/2018/snowflake_1.png'} /> 
      })
     },[])

     const renderSnows2 = React.useCallback(()=>{
        return [...Array(21)].map((snow,index)=>{
            return   <img style={{animationName:index %2 !== 0 ? "bounce":"bounce2"}} className={`ball${index}`} key={index} src={'https://tix.vn/app/assets/img/noel/2018/snowflake_1.png'} /> 
      })
     },[])
    return (

        <div p={0} className="snows" >
          {renderSnows()}
        {isSnow && renderSnows1()}
        {isSnow && renderSnows2()}
        </div>
    )
}


export default ThemeSnow;