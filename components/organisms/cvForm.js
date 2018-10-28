import React, {Component} from 'react';
import Link from 'next/link';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from "react-redux";
//import { createCV, updateCV, selectCV, deselectCV } from "../../actions";

class CVForm extends Component{
    onSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        alert("submit");
    }

    render(){ 
        return (
            <div className="w3-margin-bottom">
                <div className="row w3-container">
                    <div className="col-md-10 mx-auto">
                        <div className="w3-container w3-blue"><h1>User</h1></div>
                        <form onSubmit={this.onSubmit}>
                            <div className="w3-container w3-border w3-padding">
                                <div className="form-group row">
                                    <Field
                                        name="firstname"
                                        label="First name"
                                        type="text"
                                        grid="6"
                                        component={renderField}
                                    />
                                    <Field
                                        name="lastname"
                                        label="Last name"
                                        type="text"
                                        grid="6"
                                        component={renderField}
                                    />
                                </div>
                                <div className="form-group row">
                                    <Field
                                        name="birthdate"
                                        label="Date of birth"
                                        type="date"
                                        grid="6"
                                        component={renderField}
                                    />
                                    <Field
                                        name="email"
                                        label="E-mail"
                                        type="email"
                                        grid="6"
                                        component={renderField}
                                    />
                                </div>
                                <div className="form-group row">
                                    <Field
                                        name="phone"
                                        label="Phone"
                                        type="text"
                                        grid="6"
                                        component={renderField}
                                    />
                                    <Field
                                        name="drivingLicence"
                                        label="Driving licence"
                                        type="text"
                                        grid="6"
                                        component={renderField}
                                    />
                                </div>
                                <div className="form-group row">
                                    <Field
                                        name="address"
                                        label="Address"
                                        type="text"
                                        grid="6"
                                        component={renderField}
                                    />
                                    <Field
                                        name="linkedinAccount"
                                        label="Linkedin account"
                                        type="url"
                                        grid="6"
                                        component={renderField}
                                    />
                                </div>
                                <div className="form-group row">
                                    <Field
                                        name="webpage"
                                        label="Webpage"
                                        type="url"
                                        grid="6"
                                        component={renderField}
                                    />
                                    <Field
                                        name="image"
                                        label="Image"
                                        type="file"
                                        grid="6"
                                        component={renderFileInput}
                                    />
                                </div>
                            
                                <FieldArray name="skills" component={renderSkills} />
                                <FieldArray name="education" component={renderEducation} />
                                <FieldArray name="work" component={renderWork} />
                                <FieldArray name="hobbies" component={renderHobbies} />
                                <div className="w3-margin-top">
                                    <button type="submit" className="w3-button w3-green w3-round" disabled={this.props.submitting} >Submit</button>
                                    <Link href="/cv"><a className="w3-button w3-red w3-round">Cancel</a></Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const renderFileInput = (props) => {
    const onChange = (e) => {
        props.input.onChange(e.target.files[0]);
    }
    const grid = `col-sm-${props.grid}`;

    return (
        <div className={grid}>
            <label>{props.label}</label>
            <input
                type="file"
                className="form-control w3-padding"
                onChange={onChange}
            />
            <div className="text-danger">
                {props.meta.touched ? props.meta.error : '' }
            </div>
        </div>
    );
  }

const renderField = (field) => {
    const className = `w3-input form-control ${field.meta.touched && field.meta.error ? 'is-invalid' : ''}`;
    const grid = `col-sm-${field.grid}`;

    return (
        <div className={grid}>
            <label>{field.label}</label>
            <input 
                className={className}
                type={field.type}
                autoComplete="off"
                {...field.input}
            />
            <div className="text-danger">
                {field.meta.touched ? field.meta.error : '' }
            </div>
        </div>
    );
}

const RenderCard = (props) => (
    <div className="w3-border w3-margin-top w3-margin-bottom">
        <div className="w3-container w3-blue">
            <h1 className="w3-left">{props.title}</h1>
            <button
                type="button"
                title="Remove Skill"
                className="w3-button w3-blue w3-right"
                onClick={props.onClose}
            >
                X
            </button>
        </div>
        <div className="w3-padding">
            {props.children}
        </div>
    </div>
);

const renderSkills = ({ fields, meta: { error, submitFailed } }) => (
    <div className="w3-border w3-margin-top">
      <div className="w3-container w3-blue"><h1>Skills</h1></div>
      <div className="w3-padding">     
        {fields.map((skill, index) => (
            <RenderCard title={`Skill #${index + 1}`} onClose={() => fields.remove(index)} key={index}>
            <div className="form-group row">
            <Field
                name={`${skill}.title`}
                type="text"
                component={renderField}
                label="Title"
                grid="12"
            />
            </div>
            <div className="form-group row">
            <Field
                name={`${skill}.note`}
                type="text"
                component={renderField}
                label="Note"
                grid="12"
            />
            </div>
            <div className="form-group row">
            <Field
                name={`${skill}.level`}
                type="number"
                component={renderField}
                label="Level"
                grid="12"
            />
            </div>
            </RenderCard>
        ))}
        <button type="button" className="w3-button w3-green w3-round" onClick={() => fields.push({})}>
            Add Skill
        </button>
        {submitFailed && error && <span>{error}</span>}
    </div>
    </div>
  )

  const renderEducation = ({ fields, meta: { error, submitFailed } }) => (
    <div className="w3-border w3-margin-top">
      <div className="w3-container w3-blue"><h1>Education</h1></div>
      <div className="w3-padding"> 
        {fields.map((education, index) => (
            <RenderCard title={`School #${index + 1}`} onClose={() => fields.remove(index)} key={index}>
                <div className="form-group row">
                    <Field
                        name={`${education}.startDate`}
                        label="Start Date"
                        type="date"
                        grid="6"
                        component={renderField}
                    />
                    <Field
                        name={`${education}.endDate`}
                        label="End Date"
                        type="date"
                        grid="6"
                        component={renderField}
                    />
                </div>
                <div className="form-group row">
            <Field
                name={`${education}.schoolName`}
                type="text"
                component={renderField}
                label="School name"
                grid="6"
            />
            <Field
                name={`${education}.faculty`}
                type="text"
                component={renderField}
                label="Faculty"
                grid="6"
            />
            </div>
            <div className="form-group row">
            <Field
                name={`${education}.major`}
                type="text"
                component={renderField}
                label="Major"
                grid="6"
            />
            <Field
                name={`${education}.degree`}
                type="text"
                component={renderField}
                label="Degree"
                grid="6"
            />
            </div>
            <div className="form-group row">
            <Field
                name={`${education}.thesis`}
                type="text"
                component={renderField}
                label="Thesis"
                grid="12"
            />
            </div>
        </RenderCard>    
        ))}
        <button type="button" className="w3-button w3-green w3-round" onClick={() => fields.push({})}>
                Add School
            </button>
            {submitFailed && error && <span>{error}</span>}
        </div>
    </div>
  )

  const renderWork = ({ fields, meta: { error, submitFailed } }) => (
    <div className="w3-border w3-margin-top">
      <div className="w3-container w3-blue"><h1>Work</h1></div>
      <div className="w3-padding"> 
      {fields.map((work, index) => (
        <RenderCard title={`Job #${index + 1}`} onClose={() => fields.remove(index)} key={index}>
            <div className="form-group row">
                <Field
                    name={`${work}.startDate`}
                    label="Start Date"
                    type="date"
                    grid="6"
                    component={renderField}
                />
                <Field
                    name={`${work}.endDate`}
                    label="End Date"
                    type="date"
                    grid="6"
                    component={renderField}
                />
            </div>
            <div className="form-group row">
                <Field
                    name={`${work}.company`}
                    label="Company"
                    type="text"
                    grid="6"
                    component={renderField}
                />
                <Field
                    name={`${work}.position`}
                    label="Position"
                    type="text"
                    grid="6"
                    component={renderField}
                />
            </div>   
            <div className="form-group row">
                <Field
                    name={`${work}.type`}
                    label="Type"
                    type="text"
                    grid="6"
                    component={renderField}
                />
                <Field
                    name={`${work}.webpage`}
                    label="Webpage"
                    type="url"
                    grid="6"
                    component={renderField}
                />
            </div>   
            <div className="form-group row">
                <Field
                    name={`${work}.address`}
                    label="Address"
                    type="text"
                    grid="12"
                    component={renderField}
                />
            </div>  
            <div className="form-group row">
                <Field
                    name={`${work}.notes`}
                    label="Notes"
                    type="text"
                    grid="12"
                    component={renderField}
                />
            </div>   
        </RenderCard>
      ))}
      <button type="button" className="w3-button w3-green w3-round" onClick={() => fields.push({})}>
            Add Job
        </button>
        {submitFailed && error && <span>{error}</span>}
        </div>
    </div>
  )

  const renderHobbies = ({ fields, meta: { error, submitFailed } }) => (
    <div className="w3-border w3-margin-top">
      <div className="w3-container w3-blue"><h1>Hobbies</h1></div>
      <div className="w3-padding"> 
      {fields.map((hobby, index) => (
          <RenderCard title={`Hobby #${index + 1}`} onClose={() => fields.remove(index)} key={index}>
          <div className="form-group row">
          <Field
            name={`${hobby}.notes`}
            type="text"
            component={renderField}
            label="Note"
            grid="12"
          />
          </div>
          </RenderCard>
      ))}
      <button type="button" className="w3-button w3-green w3-round" onClick={() => fields.push({})}>
            Add Hobby
        </button>
        {submitFailed && error && <span>{error}</span>}
        </div>
    </div>
  )

const validate = (values) => {
    console.log("validation", values);
    const errors = {}
    
    if (!values.username){
        errors.username = "Required";
    }

    if (!values.id && !values.password){
        errors.password = "Required";
    }

    if (!values.firstname){
        errors.firstname = "Required";
    }

    if (!values.lastname){
        errors.lastname = "Required";
    }
    return errors;
};

function mapStateToProps(state){    
    return {
        initialValues: state.selectedCV
    };
}

CVForm = reduxForm({
    validate: validate,
    enableReinitialize: true,
    form: 'CVNewForm'
})(CVForm)

CVForm = connect(mapStateToProps, {})(CVForm);

export default CVForm;