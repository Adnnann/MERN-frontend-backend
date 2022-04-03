import { Dialog, Box, CardMedia, DialogContent, Typography, ButtonGroup, Button, Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { 
         getBookData, 
         getBookDataModal,
        displayBookDataModal 
} from "../features/librarySlice";

const DisplayBookData = () => {
    
const bookDataModalStatus = useSelector(getBookDataModal)
const bookData = useSelector(getBookData)
const dispatch = useDispatch()

return(
<Dialog
    open={bookDataModalStatus}
>

<DialogContent
tabIndex={-1}>

{
    Object.keys(bookData).length !== 0 ?

            <><Box flexDirection={'column'}>

                <CardMedia 
                component={'img'}
                style={{maxWidth:'280px', marginLeft:'10px', marginTop:'10px'}}
                src={`/images/${bookData[0].Image}.jpg`}></CardMedia>

                <DialogContent>

                <Typography variant="h6" marginTop={'20px'} marginBottom='10px' fontStyle={'italic'}>
                        {bookData[0].Author}
                    </Typography>
                
                    <Typography variant="h4">
                        {bookData[0].Title}
                    </Typography>

                    <Typography variant="h6" marginTop={'20px'}>
                        {bookData[0].Description}
                    </Typography>

                </DialogContent>
  
            </Box>

            <Grid container justifyContent={'center'}>
                <Button variant="contained"  
                style={{minWidth:"120px", minHeight:'60px', marginBottom:'10px'}}
                onClick={()=>dispatch(displayBookDataModal(false))}>Back</Button>
            </Grid>
                  
        </>
        :null}

    </DialogContent>
</Dialog>
    )
}

export default DisplayBookData