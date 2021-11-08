import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Entrust extends Entity {
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
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  size: number;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  presentation: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Entrust>) {
    super(data);
  }
}

export interface EntrustRelations {
  // describe navigational properties here
}

export type EntrustWithRelations = Entrust & EntrustRelations;
