import React, {useState} from 'react'
import './UbiNavBar.css';
import UbiNav from "./UbiNav";



function UbiNavBar() {

    //ubiCov extract state and set initial state


    const [dataShown, setDataToShow] = useState([
        {displayData: "Covid", label: "Vaccinations", id: "001", selected: false},
        {displayData: "Covid", label: "Cases", id: "002", selected: false},
        {displayData: "Covid", label: "Deaths", id: "003", selected: false}]);
    const updatedDataShown = id => {
        const updatedDataShown = dataShown;
      updatedDataShown.forEach(data =>

            (data.id === id) ? data.selected = true : data.selected = false
        );
        setDataToShow(updatedDataShown);
    }
    return (
        <div className="UbiNavBar">
            <UbiNav dataToShow={dataShown} updatedDataShown={updatedDataShown}/>

        </div>
    );
}

export default UbiNavBar;
