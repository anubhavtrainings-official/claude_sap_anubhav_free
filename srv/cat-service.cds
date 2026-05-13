using { anubhav.claude as db }     from '../db/schema';
using { anubhav.claude as common } from '../db/common';

service CatalogService @(path : 'catalog') {

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

