---
title: Admin Functions
keywords: Admin portal, admin
last_updated: July 3, 2016
tags: [admin]
summary: "This document outlines the various functions of UI elements found on each Admin page."
sidebar: mydoc_sidebar
permalink: mydoc_admin_functions.html
folder: mydoc
---

## Sign Up

{% include image.html file="sign_up.png" alt="Sign in screenshot" caption="Sign up form" %}

<!-- {% include inline_image.html file="sign_up.png" alt="Sign up screenshot" %} -->

<!-- Using Navtabs -->



<ul id="signUpfunctionTabs" class="nav nav-tabs">
    <li class="active"><a href="#signUpDetails" data-toggle="tab">Details</a></li>
    <li><a href="#signUpFields" data-toggle="tab">Fields</a></li>
</ul>

<div class="tab-content">

<div role="tabpanel" class="tab-pane active" id="signUpDetails">
    <ul>
        <li>Every new user must enter the details outlined above to register in the admin portal</li>
        <li>Basic password validation will make accounts slightly more secure</li>
        <li>A privacy policy might be written for the application itself rather than the admin portal</li>
        <li>The “Sign up” button should be greyed out if a required field is invalid</li>
        <li>The “Sign In” link conveniently redirects existing users to the sign in page</li>
    </ul>
</div>

<div role="tabpanel" class="tab-pane" id="signUpFields">
    <ol>
        <li>Given name input <span class="label label-warning">required</span></li>
        <li>Family name input</li>
        <li>Username input <span class="label label-warning">required</span></li>
        <li>Email input <span class="label label-warning">required</span></li>
        <li>Password input <span class="label label-warning">required</span></li>
        <li>Privacy polocy checkbox <span class="label label-warning">required</span></li>
        <li>Signup button <span class="label label-warning">required</span></li>
        <li>Sign in link <span class="label label-warning">required</span></li>
    </ol>
</div>

</div>


<!-- Using Tables -->

<!-- | Function | Details | Fields |
|-------|--------|---------|
| Sign up form | Every new user must enter the details outlined above to register in the admin portal | (1) Given name input <span class="label label-warning">required</span> |
| | Basic password validation will make accounts slightly more secure | (2) Family name put |
| | A privacy policy might be written for the application itself rather than the admin portal | (4) Email input <span class="label label-warning">required</span> |
| | The “Sign up” button should be greyed out if a required field is invalid | (5) Password input <span class="label label-warning">required</span> |
| | The “Sign In” link conveniently redirects existing users to the sign in page | (6) Privacy policy checkbox <span class="label label-warning">required</span> |
| | | (7) Sign up button (submit form) |
| | | (8) Sign in link -->


## Sign In


{% include image.html file="sign_in.png" alt="Sign in screenshot" caption="Sign in form" %}

<!-- | Function | Details | Fields |
|-------|--------|---------|
| Sign in form | Users have the option to enter either their username or email to sign in |
| | A pop-up message should be displayed if either field is incorrect |
| | Checking the “remember me” checkbox stores a token in the user’s browser that identifies them next time they access the admin portal |
| | The “forgot password” link should redirect users to the forgot password page |
| | The “forgot password” link should redirect new users to the sign up page |

{% include links.html %} -->

<ul id="signInFunctionTabs" class="nav nav-tabs">
    <li class="active"><a href="#signInDetails" data-toggle="tab">Details</a></li>
    <li><a href="#signInFields" data-toggle="tab">Fields</a></li>
</ul>

<div class="tab-content">

<div role="tabpanel" class="tab-pane active" id="signInDetails">
    <ul>
        <li>Users have the option to enter either their username or email to sign in</li>
        <li>A pop-up message should be displayed if either field is incorrect</li>
        <li>Checking the “remember me” checkbox stores a token in the user’s browser that identifies them next time they access the admin portal</li>
        <li>The “forgot password” link should redirect users to the forgot password page</li>
        <li>The “forgot password” link should redirect new users to the sign up page</li>
    </ul>
</div>

<div role="tabpanel" class="tab-pane" id="signInFields">
    <ol>
        <li>Username or Email input <span class="label label-warning">required</span></li>
        <li>Password input <span class="label label-warning">required</span></li>
        <li>Remember me checkbox</li>
        <li>Forgot password link</li>
        <li>Sign in button (submit form)</li>
        <li>Sign up link</li>
    </ol>
</div>

</div>

## Forgot Password

{% include image.html file="forgotPassword.png" alt="Sign in screenshot" caption="Forgot password form" %}
{% include image.html file="forgotPassword2.png" alt="Sign in screenshot" caption="Email sent notification" %}
{% include image.html file="forgotPassword3.png" alt="Sign in screenshot" caption="No email notification" %}

<ul id="forgotPasswordTabs" class="nav nav-tabs">
    <li class="active"><a href="#forgotPasswordDetails" data-toggle="tab">Details</a></li>
    <li><a href="#forgotPasswordFields" data-toggle="tab">Fields</a></li>
</ul>

<div class="tab-content">

<div role="tabpanel" class="tab-pane active" id="forgotPasswordDetails">
    <ul>
        <li>Users can enter either username or email to recover their account</li>
        <li>If an account associated with the information entered is found, an email will be sent to the user with instructions on how to create a new password. Additionally, a success message should pop up at the top of the window to let the user know.</li>
        <li>If no account is found, an error message should pop up at the top of the window to inform the user.</li>
        <li>If the username/email input field is invalid or empty, the “recover password” button should be inactive.</li>
        <li>The sign in/ sign up links below the form should redirect users to the corresponding pages.</li>
    </ul>
</div>

<div role="tabpanel" class="tab-pane" id="forgotPasswordFields">
    <ol>
        <li>Username or Email input <span class="label label-warning">required</span></li>
        <li>Recover Password button (submit form)</li>
        <li>Sign in link</li>
        <li>Sign up link</li>
    </ol>
</div>

</div>


## New Password

{% include image.html file="newPassword.png" alt="Sign in screenshot" caption="Sign up form" %}

<ul id="newPasswordTabs" class="nav nav-tabs">
    <li class="active"><a href="#newPasswordDetails" data-toggle="tab">Details</a></li>
    <li><a href="#newPasswordFields" data-toggle="tab">Fields</a></li>
</ul>

<div class="tab-content">

<div role="tabpanel" class="tab-pane active" id="newPasswordDetails">
    <ul>
        <li>The “email” field is read-only and lets users be aware of which email is associated with the account that they wish to recover.</li>
        <li>Both the “new password” and “confirm new password” input fields have basic validation and must match.</li>
        <li>If any of the fields is invalid, empty or the passwords do not match, the “change password” button should be inactive.</li>
        <li>If all inputs are valid, clicking on the “change password” button should redirect users to the dashboard page, with a success message at the top of the window informing them that their password has changed (possibly along with an email).</li>
        <li>The sign in/ sign up links below the form should redirect users to the corresponding pages.</li>
    </ul>
</div>

<div role="tabpanel" class="tab-pane" id="newPasswordFields">
    <ol>
        <li>Email (read-only)</li>
        <li>New password input <span class="label label-warning">required</span></li>
        <li>Confirm new password input <span class="label label-warning">required</span></li>
        <li>Change Password button (submit form)</li>
        <li>Sign in link</li>
        <li>Sign up link</li>
    </ol>
</div>

</div>