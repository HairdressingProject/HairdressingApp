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



<ul id="sign_up_functionTabs" class="nav nav-tabs">
    <li class="active"><a href="#details" data-toggle="tab">Details</a></li>
    <li><a href="#fields" data-toggle="tab">Fields</a></li>
</ul>

<div class="tab-content">

<div role="tabpanel" class="tab-pane active" id="details">
    <ul>
        <li>Every new user must enter the details outlined above to register in the admin portal</li>
        <li>Basic password validation will make accounts slightly more secure</li>
        <li>A privacy policy might be written for the application itself rather than the admin portal</li>
        <li>The “Sign up” button should be greyed out if a required field is invalid</li>
        <li>The “Sign In” link conveniently redirects existing users to the sign in page</li>
    </ul>
</div>

<div role="tabpanel" class="tab-pane" id="fields">
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

<ul id="sign_in_functionTabs" class="nav nav-tabs">
    <li class="active"><a href="#sign_in_details" data-toggle="tab">Details</a></li>
    <li><a href="#sign_in_fields" data-toggle="tab">Fields</a></li>
</ul>

<div class="tab-content">

<div role="tabpanel" class="tab-pane active" id="sign_in_details">
    <ul>
        <li>Users have the option to enter either their username or email to sign in</li>
        <li>A pop-up message should be displayed if either field is incorrect</li>
        <li>Checking the “remember me” checkbox stores a token in the user’s browser that identifies them next time they access the admin portal</li>
        <li>The “forgot password” link should redirect users to the forgot password page</li>
        <li>The “forgot password” link should redirect new users to the sign up page</li>
    </ul>
</div>

<div role="tabpanel" class="tab-pane" id="sign_in_fields">
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
