import { Dialog, Box, CardMedia, DialogContent, Typography, ButtonGroup, Button, Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { displayAuthorDataModal, getAuthorData, getAuthorDataModalStatus } from "../features/librarySlice";

const DisplayAuthorData = () => {
    
const authorDataModalStatus = useSelector(getAuthorDataModalStatus)
const authorData = useSelector(getAuthorData)
const dispatch = useDispatch()

return(
<Dialog
    open={authorDataModalStatus}
>

<DialogContent
tabIndex={-1}>

{
    Object.keys(authorData).length !== 0 ?

            <><Box flexDirection={'column'}>

                <CardMedia 
                component={'img'}
                style={{maxWidth:'280px', marginLeft:'10px', marginTop:'10px'}}
                src={`/images/${authorData[0].Image}.jpg`}></CardMedia>

                <DialogContent>
                    <Typography variant="h4">
                        {authorData[0].Name}
                    </Typography>
                    <Typography variant="h6" marginTop={'20px'}>
                        {authorData[0].Biography}
                    </Typography>
                </DialogContent>
  
            </Box>

            <Grid container justifyContent={'center'}>
                <Button variant="contained"  
                style={{minWidth:"120px", minHeight:'60px', marginBottom:'10px'}}
                onClick={()=>dispatch(displayAuthorDataModal(false))}>Back</Button>
            </Grid>
                  
        </>
        :null}

    </DialogContent>
</Dialog>
    )
}

export default DisplayAuthorData