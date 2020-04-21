import moment from 'moment';

export class Users {

    id;
    userName;
    userPassword;
    userEmail;
    firstName;
    lastName;
    userRole;
    dateCreated;
    dateModified;
    userFeatures;

    constructor(
        firstName,
        lastName,
        userName,
        userEmail,
        userPassword,
        userFeatures = [],
        dateCreated = moment().format('DD/MM/YYYY hh:mm:ss A'),
        dateModified = null
    )
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userFeatures = userFeatures;
        this.dateCreated = dateCreated;
        this.dateModified = dateModified;
    }

    get firstName() {
        return this.firstName;
    }

    set firstName(value) {
        this.firstName = value;
    }

    get lastName() {
        return this.lastName;
    }

    set lastName(value) {
        this.lastName = value;
    }

    get userName() {
        return this.userName;
    }

    set userName(value) {
        this.userName = value;
    }

    get userEmail() {
        return this.userEmail;
    }

    set userEmail(value) {
        this.userEmail = value;
    }

    get userPassword() {
        return this.userPassword;
    }

    set userPassword(value) {
        this.userPassword = value;
    }

    get userFeatures() {
        return this.userFeatures;
    }

    set userFeatures(value) {
        this.userFeatures = value;
    }

    get dateCreated() {
        return this.dateCreated;
    }

    set dateCreated(value) {
        this.dateCreated = value;
    }

    get dateModified() {
        return this.dateModified;
    }

    set dateModified(value) {
        this.dateModified = value;
    }

    



}