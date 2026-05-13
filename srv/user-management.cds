using { anubhav.claude as db }     from '../db/schema';
using { anubhav.claude as common } from '../db/common';

@path: '/user-management'
@requires: 'Admin'
service UserManagement {

    entity Users     as projection on db.Users;

    @readonly
    entity Roles     as projection on common.Roles;

    entity UserRoles as projection on db.UserRoles;

    function lockUser(userId: String)   returns Boolean;
    function unlockUser(userId: String) returns Boolean;

    action createUser(firstName: String, lastName: String, email: String, roleId: String) returns Users;
    action resetPassword(userId: String, newPassword: String) returns Boolean;
    action assignRole(userId: String, roleId: String)   returns Boolean;
    action unassignRole(userId: String, roleId: String) returns Boolean;
}
