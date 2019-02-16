import React, { Component } from 'react';
import TextFieldGroup from '../Common/TextFieldGroup';


class GroupFilter extends Component {

    state = {
        groupName: '',
        level: '',
    }

    onChange = (e) => {
        this.setState({groupName: e.target.value});
        this.props.filterChange(e.target.value);
    }

    render() {
        const { groupName} = this.state;
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <h5>Filtre de acordo com suas preferências</h5>
                        <div className="col-sm-6">
                            <div className="row">
                                <TextFieldGroup
                                    field="GroupName"
                                    value={groupName}
                                    onChange={this.onChange}
                                    placeholder="Nome do grupo"
                                />
                                <select className="form-control col-md-4" style={{marginLeft: "10px"}}>
                                    <option defaultValue>Nível</option>
                                    <option>Iniciante</option>
                                    <option>Intermediário</option>
                                    <option>Avançado</option>
                                    <option>Fluente</option>
                                </select>
                            </div>
                            <div className="row">
                                <button className="btn btn-warning">Limpar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GroupFilter;


