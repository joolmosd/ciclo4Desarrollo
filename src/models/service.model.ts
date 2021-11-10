import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Client} from './client.model';
import {Entrust} from './entrust.model';

@model({settings: {strict: false}})
export class Service extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  @property({
    type: 'string',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  time: string;

  @property({
    type: 'number',
    required: true,
  })
  value: number;

  @belongsTo(() => Client, {name: 'originFk'})
  origin: string;

  @belongsTo(() => Client, {name: 'destinyFk'})
  destiny: string;

  @belongsTo(() => Entrust, {name: 'entrustFk'})
  entrust: string;

  constructor(data?: Partial<Service>) {
    super(data);
  }
}

export interface ServiceRelations {
  // describe navigational properties here
}

export type ServiceWithRelations = Service & ServiceRelations;
