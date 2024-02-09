import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { getAddon, setAddon } from "../redux/services";
import SVG from "react-inlinesvg";
import { getInputClasses } from "../../../../helpers/getInputClasses";

export default class Twilio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            initialValues: null,
            twilioSchema: Yup.object().shape({
                accountSid: Yup.string()
                    .required("ACCOUNT SID is required"),
                authToken: Yup.string()
                    .required("AUTH TOKEN is required"),
            }),
            isError: false,
            isSuccess: false,
        }
    }

    componentDidMount() {
        this.setState({ loading: false });
        getAddon('twilio')
            .then(({ data }) => {
                if (data) {
                    this.setState({ initialValues: data.value, loading: false });
                } else {
                    this.setState({
                        initialValues: {
                            accountSid: "",
                            authToken: "",
                        }, loading: false
                    });
                }
            })
            .catch(() => {
                this.setState({ initialValues: null, loading: false });
            })
    }

    onSubmit = (values, formik) => {
        this.setState({ isError: false, isError: false, });
        setAddon('twilio', values)
            .then(() => {
                this.setState({ isSuccess: true })
                formik.setSubmitting(false);
            })
            .catch(() => {
                this.setState({ isError: true })
                formik.setSubmitting(false);
            })
    }

    render() {
        const { loading, initialValues, twilioSchema, isError, isSuccess } = this.state;
        return (
            <div className="mt-3">
                <div className="d-flex justify-content-between">
                    <h3>Twilio</h3>
                    <img src="/images/third-party/twilio.png" style={{ display: 'block', height: '40px', width: 'auto' }} />
                </div>
                {loading && <center className="mt-5"><Preloader use={ThreeDots}
                    size={100}
                    strokeWidth={10}
                    strokeColor="#F0AD4E"
                    duration={800} /></center>}
                {!loading && initialValues == null && <h1>No data available</h1>}
                {!loading && initialValues && <Formik
                    validationSchema={twilioSchema}
                    initialValues={initialValues}
                    onSubmit={this.onSubmit}
                >
                    {(formik) => {
                        return <form onSubmit={formik.handleSubmit} className="p-3">
                            {isError && (
                                <div
                                    className="alert alert-custom alert-light-danger fade show mb-10"
                                    role="alert"
                                >
                                    <div className="alert-icon">
                                        <span className="svg-icon svg-icon-3x svg-icon-danger">
                                            <SVG
                                                src={"/media/svg/icons/Code/Info-circle.svg"}
                                            ></SVG>{" "}
                                        </span>
                                    </div>
                                    <div className="alert-text font-weight-bold">
                                        Update Failed
                                    </div>
                                    <div className="alert-close" onClick={() => this.setState({ isError: false })}>
                                        <button
                                            type="button"
                                            className="close"
                                            data-dismiss="alert"
                                            aria-label="Close"
                                        >
                                            <span aria-hidden="true">
                                                <i className="ki ki-close"></i>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            )}
                            {isSuccess && (
                                <div
                                    className="alert alert-custom alert-light-success fade show mb-10"
                                    role="alert"
                                >
                                    <div className="alert-icon">
                                        <span className="svg-icon svg-icon-3x svg-icon-success">
                                            <SVG
                                                src={"/media/svg/icons/Code/Info-circle.svg"}
                                            ></SVG>{" "}
                                        </span>
                                    </div>
                                    <div className="alert-text font-weight-bold">
                                        Successfully Updated.
                                    </div>
                                    <div className="alert-close" onClick={() => this.setState({ isSuccess: false })}>
                                        <button
                                            type="button"
                                            className="close"
                                            data-dismiss="alert"
                                            aria-label="Close"
                                        >
                                            <span aria-hidden="true">
                                                <i className="ki ki-close"></i>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="form-group">
                                <label>ACCOUNT SID<span className="text-danger">*</span></label>
                                <input type="text" name="accountSid" className={`form-control ${getInputClasses(formik, "accountSid")}`}
                                    {...formik.getFieldProps("accountSid")}
                                    placeholder="ACCOUNT SID" />
                                {formik.touched.accountSid && formik.errors.accountSid ? (
                                    <div className="invalid-feedback">
                                        {formik.errors.accountSid}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label>AUTH TOKEN<span className="text-danger">*</span></label>
                                <input type="text" name="authToken" className={`form-control ${getInputClasses(formik, "authToken")}`}
                                    {...formik.getFieldProps("authToken")}
                                    placeholder="AUTH TOKEN" />
                                {formik.touched.authToken && formik.errors.authToken ? (
                                    <div className="invalid-feedback">
                                        {formik.errors.authToken}
                                    </div>
                                ) : null}
                            </div>

                            <div className="form-row">
                                <button type="submit" className="btn btn-primary mr-2" disabled={formik.isSubmitting}>Submit</button>
                            </div>
                        </form>
                    }}
                </Formik>}
            </div>
        )
    }
}