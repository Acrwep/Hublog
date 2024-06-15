/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Navigate } from "react-router-dom";

import AuthService from "../AuthService";
import { isEmpty } from "../Utils";

const styles = {
  root: {
    overflow: "hidden",
    position: "absolute",
    width: "95%",
    height: "80%",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    fontSize: "xx-large",
  },
};
const CenterPanel = (props) => {
  const { text, children } = props;
  return (
    <div style={styles.root}>
      <h6>
        {text}
        {children}
      </h6>
    </div>
  );
};

const notEmpty = (x) => !isEmpty(x);

export default function withLogin(WrappedComponent, isProtected = true) {
  const Auth = new AuthService();
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: undefined,
        replace: null,
      };
    }

    componentDidMount() {
      if (!Auth.loggedIn()) {
        if (isProtected) {
          // this.props.history.replace({
          //   pathname: "/login",
          //   state: { redirect: this.props.location.pathname },
          // });
          this.setState({ replace: "/login" });
          // return <Navigate to="/login" replace={true} />;
        }
        this.setState({
          user: undefined,
        });
      } else {
        try {
          const profile = Auth.getProfile();
          console.log({ profile });
          // const eligibleRoles = profile.roledescr
          //   .split(",")
          //   .filter(
          //     (role) =>
          //       !WrappedComponent.isRoleEligible ||
          //       (WrappedComponent.isRoleEligible &&
          //         WrappedComponent.isRoleEligible(role))
          //   );
          this.setState({
            user: profile,
            // eligibleRoles,
            isLoggedIn: true,
          });
        } catch (err) {
          console.log("err", err);
          Auth.logout();
          this.setState({ replace: "/login" });
          // this.props.history.replace("/login");
        }
      }
    }

    render() {
      if (this.state.replace) {
        return <Navigate to={this.state.replace} replace={true} />;
      }
      if (this.state.user) {
        return (
          <WrappedComponent
            history={this.props.history}
            {...this.props}
            {...this.state}
          />
        );
      }

      // if (this.state.user) {
      //   return notEmpty(this.state.eligibleRoles) ? (
      //     <WrappedComponent
      //       history={this.props.history}
      //       {...this.props}
      //       {...this.state}
      //     />
      //   ) : (
      //     <CenterPanel text="You are not eligible to access this page" />
      //   );
      // }
      return isProtected ? (
        <CenterPanel text="You are not eligible to access this page" />
      ) : (
        <WrappedComponent {...this.props} {...this.state} />
      );
    }
  };
}
