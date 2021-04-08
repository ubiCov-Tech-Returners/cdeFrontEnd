import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

export default function UbiNativeSelect(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        age: "",
        name: "hai"
    });

    const handleChange = (event) => {
        console.log('event.name'+event.target.name+'value'+event.target.value+'id'+event.target.id+'key'+event.target.key)
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value
        });
    };
    const onSelectChange = (event, child) => {
        console.log(event.target.value);
        console.log(event.target.options[event.target.options.selectedIndex].id);
        props.updatedDataShown(event.target.options[event.target.options.selectedIndex].id);//setting state

    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="uncontrolled-native"></InputLabel>
                <NativeSelect
                    value={props.dataToShow.find(data => data.selected)}
                    inputProps={{
                        name: "ubiNativeSelect",
                        id: "uncontrolled-native-ubiNativeSelect",
                        key: "uncontrolled-native-ubiNativeSelect"
                    }}
                    onChange={onSelectChange}
                >
                    {props.dataToShow.map((dataEntry)=>(<option value={dataEntry.label} id={dataEntry.id} key={dataEntry.id} >{dataEntry.label}</option>))}


                </NativeSelect>
                <FormHelperText>Covid Data</FormHelperText>
            </FormControl>
        </div>
    );
}
