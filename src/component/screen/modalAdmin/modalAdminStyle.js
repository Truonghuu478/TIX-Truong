import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {

        "& .modal-content": {
            
            backgroundColor: "#f1ecec",
            "& .modal-header": {
                marginBottom: "3rem",
                "& .modal-title": {
                    margin: "1rem 0",
                    textAlign: "center",
                    width: "100%"
                }
            }
        }
    },
    headerModal: {
        marginBottom: "20px",
        height: "0 !important"
    }, formModal: {
        display: "grid",





        gap: "20px",
        overflow: "hidden",
    },
    groupImg: {
        gridRow: "2 / span 4", gridColumn: "3 /span 1", padding: 20,
        "& label": {
            color: "rgb(23, 105, 170)",
            cursor: "pointer",
            padding: "10px 0",
            textAlign: "center",
            width: "100%",
            // border:"1px soild gray",

        },
        "& img": {
            width: "100%",
            height: "75%",
            objectFit: "cover"

        },
        formShowTimes: {

        }
    }
})
export default useStyles;