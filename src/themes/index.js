import {createMuiTheme} from "@material-ui/core/styles"



const theme=createMuiTheme({

        palette:{
            primary:{
                main:"#2196f4"
            },
            secondary:{
                light:"#ff1a1a",
                main:"#ff0000",
                dark:"#e60000",
            },
        
        },
        breakpoints:{
            values:{
                sm:576,
                md :768,
                lg:1024
            }
        }
    
    

})

export default theme