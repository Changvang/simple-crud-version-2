import React from "react";
import Person from "../models/person";
import { PersonForm } from "./personForm";

interface IProps {
    person: Person;
    onChange: (fieldName: string, value: string) => void;
    onSave: () => void;
}

export const PersonPage: React.FC<IProps> = (props: IProps) => {
    return (
        <PersonForm
            person={props.person}
            onChange={props.onChange}
            onSave={props.onSave}
        />
    )
}
