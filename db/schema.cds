namespace anubhav.claude;

using { cuid, Currency, managed }                                            from '@sap/cds/common';
using { anubhav.claude.AddressType, anubhav.claude.Status, anubhav.claude.Roles } from './common';

// ─── Main Entities ────────────────────────────────────────────────────────────

entity Destinations : cuid {
    @title: '{i18n>DestinationAddress}'
    address    : String(255);
    @title: '{i18n>City}'
    city       : String(40);
    @title: '{i18n>PostalCode}'
    postalCode : String(8);
    @title: '{i18n>Country}'
    country    : String(40);
    @title: '{i18n>Traveller}'
    traveller  : Association to Travellers;
}

entity Travellers : cuid, managed {
    @mandatory
    @title: '{i18n>UserName}'
    userName  : String(255);
    @title: '{i18n>FirstName}'
    firstName : String(255);
    @title: '{i18n>LastName}'
    lastName  : String(255);
    @title: '{i18n>Contacts}'
    contacts  : Composition of many Contacts  on contacts.traveller  = $self;
    @title: '{i18n>Gender}'
    gender    : String(10);
    @title: '{i18n>Age}'
    age       : Integer;
    @title: '{i18n>Status}'
    status    : Status default 'A';
    @title: '{i18n>CreatedBy}'
    createdBy : String(40);
    @title: '{i18n>Address}'
    address   : Composition of Destinations;
    @title: '{i18n>Vacations}'
    vacations : Composition of many Vacations on vacations.traveller = $self;
}

annotate Travellers with {
    modifiedAt @odata.etag;
}

entity Contacts : cuid {
    @title: '{i18n>ContactType}'
    type      : AddressType;
    @title: '{i18n>ContactAddress}'
    address   : String(255);
    @title: '{i18n>Traveller}'
    traveller : Association to Travellers;
}

entity Vacations : cuid {
    @title: '{i18n>VacationName}'
    name        : String(255);
    @title: '{i18n>Budget}'
    budget      : Decimal(10, 2);
    @title: '{i18n>Currency}'
    currency    : Currency;
    @title: '{i18n>Description}'
    description : String(1024);
    @title: '{i18n>StartsAt}'
    startsAt    : DateTime;
    @title: '{i18n>EndsAt}'
    endsAt      : DateTime;
    @title: '{i18n>Traveller}'
    traveller   : Association to Travellers;
}

// ─── User Entity ──────────────────────────────────────────────────────────────

entity AppUsers : cuid, managed {
    @mandatory
    @title: '{i18n>UserName}'
    userName    : String(100);
    @mandatory
    @title: '{i18n>Email}'
    email       : String(255);
    @title: '{i18n>FullName}'
    fullName    : String(255);
    @title: '{i18n>Role}'
    role        : Association to Roles;
    @title: '{i18n>IsActive}'
    isActive    : Boolean default true;
    @title: '{i18n>LastLoginAt}'
    lastLoginAt : DateTime;
    @title: '{i18n>Traveller}'
    traveller   : Association to Travellers;
}
