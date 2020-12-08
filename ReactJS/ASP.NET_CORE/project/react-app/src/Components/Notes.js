import { Button, ButtonGroup, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import * as Actions from "../Actions/takenote";
import NotesForm from "./NotesForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import translate from "../l18n/translate";
import lime from '@material-ui/core/colors/lime';
import { I18nProvider, LOCALES } from "../l18n";


const styles = theme =>({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem",
            primary: {
                main: lime[500],
              },
                secondary: {
                main: '#f44336',
              },
        }
        },
    paper: {
        main: lime[500],
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})
const Notes = ({classes, ...props}) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAlltakenote()
    },[])

    const {addToast} = useToasts()

    const onDelete = id =>{
        if(window.confirm('Are you sure?'))
        props.deleteTakeNote(id, () => addToast("Ok, you delete it", {appearance:'info'}))
    }

    const [locale, setLocale] = useState(LOCALES.ENGLISH)

    return (
        <I18nProvider locale = {locale}>
            <Paper className = {classes.paper} elevation = {3}>
                <Grid container>
                <Grid item xs = {6}>
                <NotesForm {...({currentId, setCurrentId, locale, setLocale})} />
                </Grid>
                <Grid item xs = {6}>
                <TableContainer>
                    <Table>
                        <TableHead className = {classes.root}>
                            <TableRow>
                                <TableCell>{translate('edit')}</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.takenoteList.map((record,index)=>{
                                    return(<TableRow key={index} hover>
                                        <TableCell>{record.takeNote}</TableCell>
                                        <TableCell>
                                            <ButtonGroup variant="text">
                                                <Button>
                                                    <EditIcon color="primary" onClick={() =>{setCurrentId(record.id)}}/>
                                                </Button>
                                                <Button>
                                                    <DeleteIcon color="primary" onClick={() => onDelete(record.id)}/>
                                                </Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>)
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                </Grid>
                </Grid>
            </Paper>
        </I18nProvider>
    );
}

const mapStateToProps = state => ({
            takenoteList: state.takenote.list
    })

const mapActionToProps = {
    fetchAlltakenote: Actions.fetchAll,
    deleteTakeNote: Actions.Delete
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles) (Notes));
