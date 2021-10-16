import React from "react";

import { Link } from "react-router-dom";
import Person from "../models/person";

import BaseService from "../services/base.service";

import * as toatr from "toastr";

function Del(Id?: string){
    BaseService.delete("/person/del/", {
        id: Id,
    }).then((rp) => {
        if(rp.Status){
            toatr.success("Member deleted.");
            window.location.reload();
        } else {
            toatr.error(rp.Message);
            console.log("Messages: " + rp.Message);
            console.log("Exception: " + rp.Exception);
        }
    });
}

interface IProps {
    person: Person,
    index: Number;
}

const TableRow: React.FC<IProps> = (props) =>{
    return(
        <tr>
            <td>{props.index}</td>
            <td>{props.person.FullName}</td>
            <td>{props.person.Address}</td>
            <td>{props.person.Age}</td>
            <td>
                <Link to={"/edit/" + props.person.Id} className="btn btn-primary">
                    Edit
                </Link>
            </td>
            <td>
                <button onClick={()=>Del(props.person.Id)} className="btn btn-danger">
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default TableRow;