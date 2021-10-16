import React from "react";
import * as toastr from 'toastr';
import Person from '../models/person';
import BaseService from '../services/base.service';
import { PersonPage } from "./page.form"
import { History } from 'history';

interface IProps {
    history: History;
    match: {
        isExact: boolean,
        params: {
            id: string
        },
        path: string,
        url: string,
    }
}

interface IState {
    person: Person
}

class Edit extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props);

        this.state = {
            person: {
                FullName: '',
                Address: '',
                Age: 0,
                Id: ''
            }
        }
        this.onFieldValueCHange = this.onFieldValueCHange.bind(this);
    }

    private onFieldValueCHange(fieldName: string, value: string){
        const nextState = {
            ...this.state,
            person: {
                ...this.state.person,
                [fieldName]: value,
            }
        }

        this.setState(nextState);
    }

    public componentDidMount(){
        BaseService.get<Person>('/person/edit/', this.props.match.params.id).then(
            (rp) => {
                if(rp.Status){
                    const person = rp.Data;
                    this.setState({person: new Person(person._id, person.fullname, person.address, person.age)});
                } else {
                    toastr.error(rp.Message);
                    console.log("Messages: " + rp.Message);
                    console.log("Exception: " + rp.Exception);
                }
            }
        )
    }

    private onSave = () => {
        BaseService.update<Person>("/person/update", this.props.match.params.id, this.state.person).then(
            (rp) => {
                if(rp.Status){
                    toastr.success("Member saved");

                    this.props.history.goBack();
                } else {
                    toastr.error(rp.Message)
                    console.log("Message: " + rp.Message);
                    console.log("Exception: " + rp.Exception);
                }
                
            }
        )
    }

    render() {
        return(
            <PersonPage
                person={this.state.person}
                onChange={this.onFieldValueCHange}
                onSave={this.onSave}
            />
        );
    }
}

export default Edit;