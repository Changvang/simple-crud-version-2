import React from "react";
import TableRow from "./TableRow";
import Person from "../models/person";
import BaseService from "../services/base.service";
import * as toastr from "toastr";

interface IProps {};

interface IState {
    listPersons: Array<Person>;
    isReady: Boolean;
    hasError: Boolean;
}

class Index extends React.Component<IProps, IState>{

    public state: IState = {
        listPersons: new Array<Person>(),
        isReady: false,
        hasError: false,
    }

    constructor(props: IProps){
        super(props);
        this.state = {
            isReady: false,
            listPersons: Array<Person>(),
            hasError: false,
        }
    }

    public componentDidMount(){
        console.log("Index didmount");
        BaseService.getAll<Person>('/persons').then((rp)=>{
            if(rp.Status){
                const data = rp.Data;
                const listPersons = new Array<Person>();

                (data || []).forEach((p: any)=>{
                    listPersons.push(new Person(p._id, p.fullname, p.address, p.age));
                });

                this.setState({listPersons: listPersons});
                this.setState({isReady: true});
            }else{
                this.setState({isReady: true});
                this.setState({hasError: true});
                console.log("Message: " + rp.Message);
                console.log("Exception: " + rp.Exception);
            }
        });

        setTimeout(() => {
            if (!this.state.isReady){
                toastr.info(
                    "It is possible that the service is being restarted, please wait more ...", 
                    "",
                    { timeOut: 8000}
                );
            } 

            if (this.state.hasError){
                toastr.error(
                    "An error occured!",
                    "",
                    { timeOut: 8000}
                )
            }
        }, 2000);
    }

    public tabRow = () => {
        if(!this.state.isReady){
            return (
                <tr>
                    <td colSpan={6} className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </td>
                </tr>
            )
        }

        if(this.state.hasError){
            return (
                <tr>
                    <td colSpan={6} className="text-center">
                        <div className='alert alert-danger' role='alert'>
                            An error occurred!
                        </div>
                    </td>
                </tr>
            )
        }

        return this.state.listPersons.map(function (object, i){
            return <TableRow key={i} index={i+1} person={object}/>
        });
    }


    public render(): React.ReactNode {
        return(
            <div>
                <h3 className="text-center">Person Lists</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Full Name</th>
                            <th>Address</th>
                            <th>Age</th>
                            <th className="text-center" colSpan={2}>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>{this.tabRow()}</tbody>
                </table>
            </div>
        )
    }
}

export default Index;