import React, { Component } from 'react';
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import DateInput from '../../components/form/DateInput';
import PlaceInput from '../../components/form/PlaceInput';
import TextInput from '../../components/form/TextInput';
import RadioInput from '../../components/form/RadioInput';


class GeneralPage extends Component {

    render() {
        const { pristine, submitting, handleSubmit, updateProfile } = this.props;
        const minimumAge = new Date(new Date().setFullYear(new Date().getFullYear() - 13));
        return (
            <Segment>
                <Header dividing size='large' content='General' />
                <Form onSubmit={handleSubmit(updateProfile)}>
                    <Field
                        width={8}
                        name='displayName'
                        type='text'
                        component={TextInput}
                        placeholder='Known As'
                    />
                    <Form.Group inline>
                      {/* todo: Gender Radio button */}
                      <label>Gender: </label>
                      <Field 
                        name='gender'
                        type='radio'
                        value='male'
                        label='Male'
                        component={RadioInput}
                      />
                      <Field 
                        name='gender'
                        type='radio'
                        value='female'
                        label='Female'
                        component={RadioInput}
                      />
                    </Form.Group>
                    <Field
                        width={8}
                        name='dateOfBirth'
                        component={DateInput}
                        placeholder='Date of Birth'
                        dateFormat='M/d/YYYY'
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode='select'
                        maxDate={minimumAge}
                    />
                    <Field
                        name='city'
                        placeholder='Home Town'
                        types={['(cities)']}
                        label='Female'
                        component={PlaceInput}
                        width={8}
                    />
                    <Divider/>
                    <Button disabled={pristine || submitting} size='large' positive content='Update Profile'/>
                </Form>
            </Segment>
        );
    }
}

export default reduxForm({form: 'userProfile', enableReinitialize: true, destroyOnUnmount: false })(GeneralPage);