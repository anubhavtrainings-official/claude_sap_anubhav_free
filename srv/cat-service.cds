using { anubhav.claude as db }     from '../db/schema';
using { anubhav.claude as common } from '../db/common';

@path: '/catalog'
@requires: 'authenticated-user'
service CatalogService {

    entity Travellers         as projection on db.Travellers;

    @readonly
    entity TravellerTypes     as projection on common.TravellerTypes;

    entity TravelledLocations as projection on db.TravelledLocations;

    entity Destinations       as projection on db.Destinations;

    @readonly
    entity TravellerStatus    as projection on common.TravellerStatus;

    @readonly
    entity AddressTypes       as projection on common.AddressTypes;
}

// ─── Row-level security & CRUD restrictions ───────────────────────────────────

annotate CatalogService.Travellers with @restrict: [
    { grant: [ 'READ', 'UPDATE' ], to: 'Traveller', where: 'userID = $user' },
    { grant: '*',                  to: 'Admin' }
];

annotate CatalogService.TravelledLocations with @restrict: [
    { grant: [ 'READ', 'CREATE', 'DELETE' ], to: 'Traveller', where: 'traveller.userID = $user' },
    { grant: '*',                            to: 'Admin' }
];

annotate CatalogService.Destinations with @restrict: [
    { grant: [ 'READ', 'CREATE' ], to: 'authenticated-user' }
];
