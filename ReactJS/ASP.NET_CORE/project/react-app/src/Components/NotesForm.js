import { Button, Grid, ButtonGroup, TextField, withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as Actions from "../Actions/takenote";
import { useToasts } from "react-toast-notifications";
import translate from "../l18n/translate";
import lime from '@material-ui/core/colors/lime';
import { LOCALES } from "../l18n";

const styles = theme =>({
    root: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        minWidth: 230,
    }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        
        margin: theme.spacing(1)
    },

    primary: {
        main: lime,
      },
        secondary: {
        main: '#f44336',
      },
      
      
})

const initialFieldValues = {
    takeNote: ''
}

const NotesForm = ({classes, ...props}) => {

    const {addToast} = useToasts()

    const validate = (fieldValues = values) =>{
        let temp = {}
        if ('takeNote' in fieldValues)
        temp.takeNote = fieldValues.takeNote?"":"This field is required!"
        setErrors({
            ...temp
        })

        if(fieldValues === values)

       return Object.values(temp).every(x => x === "")
    }
    
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        if(validate()){
            const onSuccess = () =>{
            resetForm()
            addToast("Yeah! You did it :)", {appearance:'success'})
            }
            if(props.currentId===0)
            props.createTakeNote(values, onSuccess)
            else
            props.updateTakeNote(props.currentId, values, onSuccess)
            
        }

    }
    
    useEffect(() =>{
        if (props.currentId !== 0){
        setValues({
            ...props.takenoteList.find(x => x.id===props.currentId)
        })
        setErrors({})
        }
    },[props.currentId])

    return (
            <form autoComplete="off" noValidate className = {classes.root} onSubmit = {handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                        <div className = {classes.smMargin}>
                        {translate("hello")}
                        </div>
                        <TextField
                            name = "takeNote"
                            variant = "outlined"
                            label = {translate("label")}
                            value = {values.takeNote}
                            onChange = {handleInputChange}
                            {...(errors.takeNote && { error: true, helperText: errors.takeNote})}
                            
                        />
                        <div>
                            <Button
                            className = {classes.smMargin}
                            variant = "contained"
                            color = "primary"
                            type = "submit"
                            >
                                {translate("submit")}
                                </Button>
                                <Button
                                className = {classes.smMargin}
                                variant = "contained" onClick = {resetForm}
                            >
                                {translate("reset")}
                                </Button>
                        </div>
                        
                    </Grid>
                    <Grid container item xs={6} justify="center" alignItems="center">
                    
                        <ButtonGroup color="primary" size = "small" aria-label="small outlined button group">
                            <Button onClick = {() => props.setLocale(LOCALES.ENGLISH)}>Eng</Button>
                            <Button onClick = {() => props.setLocale(LOCALES.RUSSIAN)}>Rus</Button>
                            <Button onClick = {() => props.setLocale(LOCALES.UKRAINIAN)}>Ua</Button>
                        </ButtonGroup>
                        
                    </Grid>
                </Grid>
            </form>
    );
}

const mapStateToProps = state => ({
    takenoteList: state.takenote.list
})

const mapActionToProps = {
    createTakeNote: Actions.create,
    updateTakeNote: Actions.update,
}

export default connect(mapStateToProps, mapActionToProps) (withStyles(styles) (NotesForm));
