
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model drivers
 * 
 */
export type drivers = $Result.DefaultSelection<Prisma.$driversPayload>
/**
 * Model armada
 * 
 */
export type armada = $Result.DefaultSelection<Prisma.$armadaPayload>
/**
 * Model materials
 * 
 */
export type materials = $Result.DefaultSelection<Prisma.$materialsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Drivers
 * const drivers = await prisma.drivers.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Drivers
   * const drivers = await prisma.drivers.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.drivers`: Exposes CRUD operations for the **drivers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Drivers
    * const drivers = await prisma.drivers.findMany()
    * ```
    */
  get drivers(): Prisma.driversDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.armada`: Exposes CRUD operations for the **armada** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Armadas
    * const armadas = await prisma.armada.findMany()
    * ```
    */
  get armada(): Prisma.armadaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.materials`: Exposes CRUD operations for the **materials** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Materials
    * const materials = await prisma.materials.findMany()
    * ```
    */
  get materials(): Prisma.materialsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    drivers: 'drivers',
    armada: 'armada',
    materials: 'materials'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "drivers" | "armada" | "materials"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      drivers: {
        payload: Prisma.$driversPayload<ExtArgs>
        fields: Prisma.driversFieldRefs
        operations: {
          findUnique: {
            args: Prisma.driversFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.driversFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>
          }
          findFirst: {
            args: Prisma.driversFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.driversFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>
          }
          findMany: {
            args: Prisma.driversFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>[]
          }
          create: {
            args: Prisma.driversCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>
          }
          createMany: {
            args: Prisma.driversCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.driversCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>[]
          }
          delete: {
            args: Prisma.driversDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>
          }
          update: {
            args: Prisma.driversUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>
          }
          deleteMany: {
            args: Prisma.driversDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.driversUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.driversUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>[]
          }
          upsert: {
            args: Prisma.driversUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>
          }
          aggregate: {
            args: Prisma.DriversAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDrivers>
          }
          groupBy: {
            args: Prisma.driversGroupByArgs<ExtArgs>
            result: $Utils.Optional<DriversGroupByOutputType>[]
          }
          count: {
            args: Prisma.driversCountArgs<ExtArgs>
            result: $Utils.Optional<DriversCountAggregateOutputType> | number
          }
        }
      }
      armada: {
        payload: Prisma.$armadaPayload<ExtArgs>
        fields: Prisma.armadaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.armadaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$armadaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.armadaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$armadaPayload>
          }
          findFirst: {
            args: Prisma.armadaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$armadaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.armadaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$armadaPayload>
          }
          findMany: {
            args: Prisma.armadaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$armadaPayload>[]
          }
          create: {
            args: Prisma.armadaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$armadaPayload>
          }
          createMany: {
            args: Prisma.armadaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.armadaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$armadaPayload>[]
          }
          delete: {
            args: Prisma.armadaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$armadaPayload>
          }
          update: {
            args: Prisma.armadaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$armadaPayload>
          }
          deleteMany: {
            args: Prisma.armadaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.armadaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.armadaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$armadaPayload>[]
          }
          upsert: {
            args: Prisma.armadaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$armadaPayload>
          }
          aggregate: {
            args: Prisma.ArmadaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArmada>
          }
          groupBy: {
            args: Prisma.armadaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArmadaGroupByOutputType>[]
          }
          count: {
            args: Prisma.armadaCountArgs<ExtArgs>
            result: $Utils.Optional<ArmadaCountAggregateOutputType> | number
          }
        }
      }
      materials: {
        payload: Prisma.$materialsPayload<ExtArgs>
        fields: Prisma.materialsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.materialsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$materialsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.materialsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$materialsPayload>
          }
          findFirst: {
            args: Prisma.materialsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$materialsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.materialsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$materialsPayload>
          }
          findMany: {
            args: Prisma.materialsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$materialsPayload>[]
          }
          create: {
            args: Prisma.materialsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$materialsPayload>
          }
          createMany: {
            args: Prisma.materialsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.materialsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$materialsPayload>[]
          }
          delete: {
            args: Prisma.materialsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$materialsPayload>
          }
          update: {
            args: Prisma.materialsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$materialsPayload>
          }
          deleteMany: {
            args: Prisma.materialsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.materialsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.materialsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$materialsPayload>[]
          }
          upsert: {
            args: Prisma.materialsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$materialsPayload>
          }
          aggregate: {
            args: Prisma.MaterialsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaterials>
          }
          groupBy: {
            args: Prisma.materialsGroupByArgs<ExtArgs>
            result: $Utils.Optional<MaterialsGroupByOutputType>[]
          }
          count: {
            args: Prisma.materialsCountArgs<ExtArgs>
            result: $Utils.Optional<MaterialsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    drivers?: driversOmit
    armada?: armadaOmit
    materials?: materialsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model drivers
   */

  export type AggregateDrivers = {
    _count: DriversCountAggregateOutputType | null
    _min: DriversMinAggregateOutputType | null
    _max: DriversMaxAggregateOutputType | null
  }

  export type DriversMinAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    created_at: Date | null
  }

  export type DriversMaxAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    created_at: Date | null
  }

  export type DriversCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    created_at: number
    _all: number
  }


  export type DriversMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    created_at?: true
  }

  export type DriversMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    created_at?: true
  }

  export type DriversCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    created_at?: true
    _all?: true
  }

  export type DriversAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which drivers to aggregate.
     */
    where?: driversWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of drivers to fetch.
     */
    orderBy?: driversOrderByWithRelationInput | driversOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: driversWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned drivers
    **/
    _count?: true | DriversCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DriversMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DriversMaxAggregateInputType
  }

  export type GetDriversAggregateType<T extends DriversAggregateArgs> = {
        [P in keyof T & keyof AggregateDrivers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDrivers[P]>
      : GetScalarType<T[P], AggregateDrivers[P]>
  }




  export type driversGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: driversWhereInput
    orderBy?: driversOrderByWithAggregationInput | driversOrderByWithAggregationInput[]
    by: DriversScalarFieldEnum[] | DriversScalarFieldEnum
    having?: driversScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DriversCountAggregateInputType | true
    _min?: DriversMinAggregateInputType
    _max?: DriversMaxAggregateInputType
  }

  export type DriversGroupByOutputType = {
    id: string
    name: string
    phone: string | null
    created_at: Date | null
    _count: DriversCountAggregateOutputType | null
    _min: DriversMinAggregateOutputType | null
    _max: DriversMaxAggregateOutputType | null
  }

  type GetDriversGroupByPayload<T extends driversGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DriversGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DriversGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DriversGroupByOutputType[P]>
            : GetScalarType<T[P], DriversGroupByOutputType[P]>
        }
      >
    >


  export type driversSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["drivers"]>

  export type driversSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["drivers"]>

  export type driversSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["drivers"]>

  export type driversSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    created_at?: boolean
  }

  export type driversOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "phone" | "created_at", ExtArgs["result"]["drivers"]>

  export type $driversPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "drivers"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      phone: string | null
      created_at: Date | null
    }, ExtArgs["result"]["drivers"]>
    composites: {}
  }

  type driversGetPayload<S extends boolean | null | undefined | driversDefaultArgs> = $Result.GetResult<Prisma.$driversPayload, S>

  type driversCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<driversFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DriversCountAggregateInputType | true
    }

  export interface driversDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['drivers'], meta: { name: 'drivers' } }
    /**
     * Find zero or one Drivers that matches the filter.
     * @param {driversFindUniqueArgs} args - Arguments to find a Drivers
     * @example
     * // Get one Drivers
     * const drivers = await prisma.drivers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends driversFindUniqueArgs>(args: SelectSubset<T, driversFindUniqueArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Drivers that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {driversFindUniqueOrThrowArgs} args - Arguments to find a Drivers
     * @example
     * // Get one Drivers
     * const drivers = await prisma.drivers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends driversFindUniqueOrThrowArgs>(args: SelectSubset<T, driversFindUniqueOrThrowArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Drivers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {driversFindFirstArgs} args - Arguments to find a Drivers
     * @example
     * // Get one Drivers
     * const drivers = await prisma.drivers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends driversFindFirstArgs>(args?: SelectSubset<T, driversFindFirstArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Drivers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {driversFindFirstOrThrowArgs} args - Arguments to find a Drivers
     * @example
     * // Get one Drivers
     * const drivers = await prisma.drivers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends driversFindFirstOrThrowArgs>(args?: SelectSubset<T, driversFindFirstOrThrowArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Drivers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {driversFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Drivers
     * const drivers = await prisma.drivers.findMany()
     * 
     * // Get first 10 Drivers
     * const drivers = await prisma.drivers.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const driversWithIdOnly = await prisma.drivers.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends driversFindManyArgs>(args?: SelectSubset<T, driversFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Drivers.
     * @param {driversCreateArgs} args - Arguments to create a Drivers.
     * @example
     * // Create one Drivers
     * const Drivers = await prisma.drivers.create({
     *   data: {
     *     // ... data to create a Drivers
     *   }
     * })
     * 
     */
    create<T extends driversCreateArgs>(args: SelectSubset<T, driversCreateArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Drivers.
     * @param {driversCreateManyArgs} args - Arguments to create many Drivers.
     * @example
     * // Create many Drivers
     * const drivers = await prisma.drivers.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends driversCreateManyArgs>(args?: SelectSubset<T, driversCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Drivers and returns the data saved in the database.
     * @param {driversCreateManyAndReturnArgs} args - Arguments to create many Drivers.
     * @example
     * // Create many Drivers
     * const drivers = await prisma.drivers.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Drivers and only return the `id`
     * const driversWithIdOnly = await prisma.drivers.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends driversCreateManyAndReturnArgs>(args?: SelectSubset<T, driversCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Drivers.
     * @param {driversDeleteArgs} args - Arguments to delete one Drivers.
     * @example
     * // Delete one Drivers
     * const Drivers = await prisma.drivers.delete({
     *   where: {
     *     // ... filter to delete one Drivers
     *   }
     * })
     * 
     */
    delete<T extends driversDeleteArgs>(args: SelectSubset<T, driversDeleteArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Drivers.
     * @param {driversUpdateArgs} args - Arguments to update one Drivers.
     * @example
     * // Update one Drivers
     * const drivers = await prisma.drivers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends driversUpdateArgs>(args: SelectSubset<T, driversUpdateArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Drivers.
     * @param {driversDeleteManyArgs} args - Arguments to filter Drivers to delete.
     * @example
     * // Delete a few Drivers
     * const { count } = await prisma.drivers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends driversDeleteManyArgs>(args?: SelectSubset<T, driversDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {driversUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Drivers
     * const drivers = await prisma.drivers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends driversUpdateManyArgs>(args: SelectSubset<T, driversUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drivers and returns the data updated in the database.
     * @param {driversUpdateManyAndReturnArgs} args - Arguments to update many Drivers.
     * @example
     * // Update many Drivers
     * const drivers = await prisma.drivers.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Drivers and only return the `id`
     * const driversWithIdOnly = await prisma.drivers.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends driversUpdateManyAndReturnArgs>(args: SelectSubset<T, driversUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Drivers.
     * @param {driversUpsertArgs} args - Arguments to update or create a Drivers.
     * @example
     * // Update or create a Drivers
     * const drivers = await prisma.drivers.upsert({
     *   create: {
     *     // ... data to create a Drivers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Drivers we want to update
     *   }
     * })
     */
    upsert<T extends driversUpsertArgs>(args: SelectSubset<T, driversUpsertArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {driversCountArgs} args - Arguments to filter Drivers to count.
     * @example
     * // Count the number of Drivers
     * const count = await prisma.drivers.count({
     *   where: {
     *     // ... the filter for the Drivers we want to count
     *   }
     * })
    **/
    count<T extends driversCountArgs>(
      args?: Subset<T, driversCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DriversCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriversAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DriversAggregateArgs>(args: Subset<T, DriversAggregateArgs>): Prisma.PrismaPromise<GetDriversAggregateType<T>>

    /**
     * Group by Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {driversGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends driversGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: driversGroupByArgs['orderBy'] }
        : { orderBy?: driversGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, driversGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDriversGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the drivers model
   */
  readonly fields: driversFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for drivers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__driversClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the drivers model
   */
  interface driversFieldRefs {
    readonly id: FieldRef<"drivers", 'String'>
    readonly name: FieldRef<"drivers", 'String'>
    readonly phone: FieldRef<"drivers", 'String'>
    readonly created_at: FieldRef<"drivers", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * drivers findUnique
   */
  export type driversFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * Filter, which drivers to fetch.
     */
    where: driversWhereUniqueInput
  }

  /**
   * drivers findUniqueOrThrow
   */
  export type driversFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * Filter, which drivers to fetch.
     */
    where: driversWhereUniqueInput
  }

  /**
   * drivers findFirst
   */
  export type driversFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * Filter, which drivers to fetch.
     */
    where?: driversWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of drivers to fetch.
     */
    orderBy?: driversOrderByWithRelationInput | driversOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for drivers.
     */
    cursor?: driversWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of drivers.
     */
    distinct?: DriversScalarFieldEnum | DriversScalarFieldEnum[]
  }

  /**
   * drivers findFirstOrThrow
   */
  export type driversFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * Filter, which drivers to fetch.
     */
    where?: driversWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of drivers to fetch.
     */
    orderBy?: driversOrderByWithRelationInput | driversOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for drivers.
     */
    cursor?: driversWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of drivers.
     */
    distinct?: DriversScalarFieldEnum | DriversScalarFieldEnum[]
  }

  /**
   * drivers findMany
   */
  export type driversFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * Filter, which drivers to fetch.
     */
    where?: driversWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of drivers to fetch.
     */
    orderBy?: driversOrderByWithRelationInput | driversOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing drivers.
     */
    cursor?: driversWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` drivers.
     */
    skip?: number
    distinct?: DriversScalarFieldEnum | DriversScalarFieldEnum[]
  }

  /**
   * drivers create
   */
  export type driversCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * The data needed to create a drivers.
     */
    data: XOR<driversCreateInput, driversUncheckedCreateInput>
  }

  /**
   * drivers createMany
   */
  export type driversCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many drivers.
     */
    data: driversCreateManyInput | driversCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * drivers createManyAndReturn
   */
  export type driversCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * The data used to create many drivers.
     */
    data: driversCreateManyInput | driversCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * drivers update
   */
  export type driversUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * The data needed to update a drivers.
     */
    data: XOR<driversUpdateInput, driversUncheckedUpdateInput>
    /**
     * Choose, which drivers to update.
     */
    where: driversWhereUniqueInput
  }

  /**
   * drivers updateMany
   */
  export type driversUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update drivers.
     */
    data: XOR<driversUpdateManyMutationInput, driversUncheckedUpdateManyInput>
    /**
     * Filter which drivers to update
     */
    where?: driversWhereInput
    /**
     * Limit how many drivers to update.
     */
    limit?: number
  }

  /**
   * drivers updateManyAndReturn
   */
  export type driversUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * The data used to update drivers.
     */
    data: XOR<driversUpdateManyMutationInput, driversUncheckedUpdateManyInput>
    /**
     * Filter which drivers to update
     */
    where?: driversWhereInput
    /**
     * Limit how many drivers to update.
     */
    limit?: number
  }

  /**
   * drivers upsert
   */
  export type driversUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * The filter to search for the drivers to update in case it exists.
     */
    where: driversWhereUniqueInput
    /**
     * In case the drivers found by the `where` argument doesn't exist, create a new drivers with this data.
     */
    create: XOR<driversCreateInput, driversUncheckedCreateInput>
    /**
     * In case the drivers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<driversUpdateInput, driversUncheckedUpdateInput>
  }

  /**
   * drivers delete
   */
  export type driversDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * Filter which drivers to delete.
     */
    where: driversWhereUniqueInput
  }

  /**
   * drivers deleteMany
   */
  export type driversDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which drivers to delete
     */
    where?: driversWhereInput
    /**
     * Limit how many drivers to delete.
     */
    limit?: number
  }

  /**
   * drivers without action
   */
  export type driversDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
  }


  /**
   * Model armada
   */

  export type AggregateArmada = {
    _count: ArmadaCountAggregateOutputType | null
    _min: ArmadaMinAggregateOutputType | null
    _max: ArmadaMaxAggregateOutputType | null
  }

  export type ArmadaMinAggregateOutputType = {
    id: string | null
    owner: string | null
    plat_nomor: string | null
    keterangan: string | null
    created_at: Date | null
  }

  export type ArmadaMaxAggregateOutputType = {
    id: string | null
    owner: string | null
    plat_nomor: string | null
    keterangan: string | null
    created_at: Date | null
  }

  export type ArmadaCountAggregateOutputType = {
    id: number
    owner: number
    plat_nomor: number
    keterangan: number
    created_at: number
    _all: number
  }


  export type ArmadaMinAggregateInputType = {
    id?: true
    owner?: true
    plat_nomor?: true
    keterangan?: true
    created_at?: true
  }

  export type ArmadaMaxAggregateInputType = {
    id?: true
    owner?: true
    plat_nomor?: true
    keterangan?: true
    created_at?: true
  }

  export type ArmadaCountAggregateInputType = {
    id?: true
    owner?: true
    plat_nomor?: true
    keterangan?: true
    created_at?: true
    _all?: true
  }

  export type ArmadaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which armada to aggregate.
     */
    where?: armadaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of armadas to fetch.
     */
    orderBy?: armadaOrderByWithRelationInput | armadaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: armadaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` armadas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` armadas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned armadas
    **/
    _count?: true | ArmadaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArmadaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArmadaMaxAggregateInputType
  }

  export type GetArmadaAggregateType<T extends ArmadaAggregateArgs> = {
        [P in keyof T & keyof AggregateArmada]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArmada[P]>
      : GetScalarType<T[P], AggregateArmada[P]>
  }




  export type armadaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: armadaWhereInput
    orderBy?: armadaOrderByWithAggregationInput | armadaOrderByWithAggregationInput[]
    by: ArmadaScalarFieldEnum[] | ArmadaScalarFieldEnum
    having?: armadaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArmadaCountAggregateInputType | true
    _min?: ArmadaMinAggregateInputType
    _max?: ArmadaMaxAggregateInputType
  }

  export type ArmadaGroupByOutputType = {
    id: string
    owner: string | null
    plat_nomor: string | null
    keterangan: string | null
    created_at: Date | null
    _count: ArmadaCountAggregateOutputType | null
    _min: ArmadaMinAggregateOutputType | null
    _max: ArmadaMaxAggregateOutputType | null
  }

  type GetArmadaGroupByPayload<T extends armadaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArmadaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArmadaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArmadaGroupByOutputType[P]>
            : GetScalarType<T[P], ArmadaGroupByOutputType[P]>
        }
      >
    >


  export type armadaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    owner?: boolean
    plat_nomor?: boolean
    keterangan?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["armada"]>

  export type armadaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    owner?: boolean
    plat_nomor?: boolean
    keterangan?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["armada"]>

  export type armadaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    owner?: boolean
    plat_nomor?: boolean
    keterangan?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["armada"]>

  export type armadaSelectScalar = {
    id?: boolean
    owner?: boolean
    plat_nomor?: boolean
    keterangan?: boolean
    created_at?: boolean
  }

  export type armadaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "owner" | "plat_nomor" | "keterangan" | "created_at", ExtArgs["result"]["armada"]>

  export type $armadaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "armada"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      owner: string | null
      plat_nomor: string | null
      keterangan: string | null
      created_at: Date | null
    }, ExtArgs["result"]["armada"]>
    composites: {}
  }

  type armadaGetPayload<S extends boolean | null | undefined | armadaDefaultArgs> = $Result.GetResult<Prisma.$armadaPayload, S>

  type armadaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<armadaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArmadaCountAggregateInputType | true
    }

  export interface armadaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['armada'], meta: { name: 'armada' } }
    /**
     * Find zero or one Armada that matches the filter.
     * @param {armadaFindUniqueArgs} args - Arguments to find a Armada
     * @example
     * // Get one Armada
     * const armada = await prisma.armada.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends armadaFindUniqueArgs>(args: SelectSubset<T, armadaFindUniqueArgs<ExtArgs>>): Prisma__armadaClient<$Result.GetResult<Prisma.$armadaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Armada that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {armadaFindUniqueOrThrowArgs} args - Arguments to find a Armada
     * @example
     * // Get one Armada
     * const armada = await prisma.armada.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends armadaFindUniqueOrThrowArgs>(args: SelectSubset<T, armadaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__armadaClient<$Result.GetResult<Prisma.$armadaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Armada that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {armadaFindFirstArgs} args - Arguments to find a Armada
     * @example
     * // Get one Armada
     * const armada = await prisma.armada.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends armadaFindFirstArgs>(args?: SelectSubset<T, armadaFindFirstArgs<ExtArgs>>): Prisma__armadaClient<$Result.GetResult<Prisma.$armadaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Armada that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {armadaFindFirstOrThrowArgs} args - Arguments to find a Armada
     * @example
     * // Get one Armada
     * const armada = await prisma.armada.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends armadaFindFirstOrThrowArgs>(args?: SelectSubset<T, armadaFindFirstOrThrowArgs<ExtArgs>>): Prisma__armadaClient<$Result.GetResult<Prisma.$armadaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Armadas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {armadaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Armadas
     * const armadas = await prisma.armada.findMany()
     * 
     * // Get first 10 Armadas
     * const armadas = await prisma.armada.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const armadaWithIdOnly = await prisma.armada.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends armadaFindManyArgs>(args?: SelectSubset<T, armadaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$armadaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Armada.
     * @param {armadaCreateArgs} args - Arguments to create a Armada.
     * @example
     * // Create one Armada
     * const Armada = await prisma.armada.create({
     *   data: {
     *     // ... data to create a Armada
     *   }
     * })
     * 
     */
    create<T extends armadaCreateArgs>(args: SelectSubset<T, armadaCreateArgs<ExtArgs>>): Prisma__armadaClient<$Result.GetResult<Prisma.$armadaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Armadas.
     * @param {armadaCreateManyArgs} args - Arguments to create many Armadas.
     * @example
     * // Create many Armadas
     * const armada = await prisma.armada.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends armadaCreateManyArgs>(args?: SelectSubset<T, armadaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Armadas and returns the data saved in the database.
     * @param {armadaCreateManyAndReturnArgs} args - Arguments to create many Armadas.
     * @example
     * // Create many Armadas
     * const armada = await prisma.armada.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Armadas and only return the `id`
     * const armadaWithIdOnly = await prisma.armada.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends armadaCreateManyAndReturnArgs>(args?: SelectSubset<T, armadaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$armadaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Armada.
     * @param {armadaDeleteArgs} args - Arguments to delete one Armada.
     * @example
     * // Delete one Armada
     * const Armada = await prisma.armada.delete({
     *   where: {
     *     // ... filter to delete one Armada
     *   }
     * })
     * 
     */
    delete<T extends armadaDeleteArgs>(args: SelectSubset<T, armadaDeleteArgs<ExtArgs>>): Prisma__armadaClient<$Result.GetResult<Prisma.$armadaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Armada.
     * @param {armadaUpdateArgs} args - Arguments to update one Armada.
     * @example
     * // Update one Armada
     * const armada = await prisma.armada.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends armadaUpdateArgs>(args: SelectSubset<T, armadaUpdateArgs<ExtArgs>>): Prisma__armadaClient<$Result.GetResult<Prisma.$armadaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Armadas.
     * @param {armadaDeleteManyArgs} args - Arguments to filter Armadas to delete.
     * @example
     * // Delete a few Armadas
     * const { count } = await prisma.armada.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends armadaDeleteManyArgs>(args?: SelectSubset<T, armadaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Armadas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {armadaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Armadas
     * const armada = await prisma.armada.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends armadaUpdateManyArgs>(args: SelectSubset<T, armadaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Armadas and returns the data updated in the database.
     * @param {armadaUpdateManyAndReturnArgs} args - Arguments to update many Armadas.
     * @example
     * // Update many Armadas
     * const armada = await prisma.armada.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Armadas and only return the `id`
     * const armadaWithIdOnly = await prisma.armada.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends armadaUpdateManyAndReturnArgs>(args: SelectSubset<T, armadaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$armadaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Armada.
     * @param {armadaUpsertArgs} args - Arguments to update or create a Armada.
     * @example
     * // Update or create a Armada
     * const armada = await prisma.armada.upsert({
     *   create: {
     *     // ... data to create a Armada
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Armada we want to update
     *   }
     * })
     */
    upsert<T extends armadaUpsertArgs>(args: SelectSubset<T, armadaUpsertArgs<ExtArgs>>): Prisma__armadaClient<$Result.GetResult<Prisma.$armadaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Armadas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {armadaCountArgs} args - Arguments to filter Armadas to count.
     * @example
     * // Count the number of Armadas
     * const count = await prisma.armada.count({
     *   where: {
     *     // ... the filter for the Armadas we want to count
     *   }
     * })
    **/
    count<T extends armadaCountArgs>(
      args?: Subset<T, armadaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArmadaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Armada.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArmadaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArmadaAggregateArgs>(args: Subset<T, ArmadaAggregateArgs>): Prisma.PrismaPromise<GetArmadaAggregateType<T>>

    /**
     * Group by Armada.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {armadaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends armadaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: armadaGroupByArgs['orderBy'] }
        : { orderBy?: armadaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, armadaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArmadaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the armada model
   */
  readonly fields: armadaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for armada.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__armadaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the armada model
   */
  interface armadaFieldRefs {
    readonly id: FieldRef<"armada", 'String'>
    readonly owner: FieldRef<"armada", 'String'>
    readonly plat_nomor: FieldRef<"armada", 'String'>
    readonly keterangan: FieldRef<"armada", 'String'>
    readonly created_at: FieldRef<"armada", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * armada findUnique
   */
  export type armadaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the armada
     */
    select?: armadaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the armada
     */
    omit?: armadaOmit<ExtArgs> | null
    /**
     * Filter, which armada to fetch.
     */
    where: armadaWhereUniqueInput
  }

  /**
   * armada findUniqueOrThrow
   */
  export type armadaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the armada
     */
    select?: armadaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the armada
     */
    omit?: armadaOmit<ExtArgs> | null
    /**
     * Filter, which armada to fetch.
     */
    where: armadaWhereUniqueInput
  }

  /**
   * armada findFirst
   */
  export type armadaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the armada
     */
    select?: armadaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the armada
     */
    omit?: armadaOmit<ExtArgs> | null
    /**
     * Filter, which armada to fetch.
     */
    where?: armadaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of armadas to fetch.
     */
    orderBy?: armadaOrderByWithRelationInput | armadaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for armadas.
     */
    cursor?: armadaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` armadas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` armadas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of armadas.
     */
    distinct?: ArmadaScalarFieldEnum | ArmadaScalarFieldEnum[]
  }

  /**
   * armada findFirstOrThrow
   */
  export type armadaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the armada
     */
    select?: armadaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the armada
     */
    omit?: armadaOmit<ExtArgs> | null
    /**
     * Filter, which armada to fetch.
     */
    where?: armadaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of armadas to fetch.
     */
    orderBy?: armadaOrderByWithRelationInput | armadaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for armadas.
     */
    cursor?: armadaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` armadas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` armadas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of armadas.
     */
    distinct?: ArmadaScalarFieldEnum | ArmadaScalarFieldEnum[]
  }

  /**
   * armada findMany
   */
  export type armadaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the armada
     */
    select?: armadaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the armada
     */
    omit?: armadaOmit<ExtArgs> | null
    /**
     * Filter, which armadas to fetch.
     */
    where?: armadaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of armadas to fetch.
     */
    orderBy?: armadaOrderByWithRelationInput | armadaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing armadas.
     */
    cursor?: armadaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` armadas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` armadas.
     */
    skip?: number
    distinct?: ArmadaScalarFieldEnum | ArmadaScalarFieldEnum[]
  }

  /**
   * armada create
   */
  export type armadaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the armada
     */
    select?: armadaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the armada
     */
    omit?: armadaOmit<ExtArgs> | null
    /**
     * The data needed to create a armada.
     */
    data?: XOR<armadaCreateInput, armadaUncheckedCreateInput>
  }

  /**
   * armada createMany
   */
  export type armadaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many armadas.
     */
    data: armadaCreateManyInput | armadaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * armada createManyAndReturn
   */
  export type armadaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the armada
     */
    select?: armadaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the armada
     */
    omit?: armadaOmit<ExtArgs> | null
    /**
     * The data used to create many armadas.
     */
    data: armadaCreateManyInput | armadaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * armada update
   */
  export type armadaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the armada
     */
    select?: armadaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the armada
     */
    omit?: armadaOmit<ExtArgs> | null
    /**
     * The data needed to update a armada.
     */
    data: XOR<armadaUpdateInput, armadaUncheckedUpdateInput>
    /**
     * Choose, which armada to update.
     */
    where: armadaWhereUniqueInput
  }

  /**
   * armada updateMany
   */
  export type armadaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update armadas.
     */
    data: XOR<armadaUpdateManyMutationInput, armadaUncheckedUpdateManyInput>
    /**
     * Filter which armadas to update
     */
    where?: armadaWhereInput
    /**
     * Limit how many armadas to update.
     */
    limit?: number
  }

  /**
   * armada updateManyAndReturn
   */
  export type armadaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the armada
     */
    select?: armadaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the armada
     */
    omit?: armadaOmit<ExtArgs> | null
    /**
     * The data used to update armadas.
     */
    data: XOR<armadaUpdateManyMutationInput, armadaUncheckedUpdateManyInput>
    /**
     * Filter which armadas to update
     */
    where?: armadaWhereInput
    /**
     * Limit how many armadas to update.
     */
    limit?: number
  }

  /**
   * armada upsert
   */
  export type armadaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the armada
     */
    select?: armadaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the armada
     */
    omit?: armadaOmit<ExtArgs> | null
    /**
     * The filter to search for the armada to update in case it exists.
     */
    where: armadaWhereUniqueInput
    /**
     * In case the armada found by the `where` argument doesn't exist, create a new armada with this data.
     */
    create: XOR<armadaCreateInput, armadaUncheckedCreateInput>
    /**
     * In case the armada was found with the provided `where` argument, update it with this data.
     */
    update: XOR<armadaUpdateInput, armadaUncheckedUpdateInput>
  }

  /**
   * armada delete
   */
  export type armadaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the armada
     */
    select?: armadaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the armada
     */
    omit?: armadaOmit<ExtArgs> | null
    /**
     * Filter which armada to delete.
     */
    where: armadaWhereUniqueInput
  }

  /**
   * armada deleteMany
   */
  export type armadaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which armadas to delete
     */
    where?: armadaWhereInput
    /**
     * Limit how many armadas to delete.
     */
    limit?: number
  }

  /**
   * armada without action
   */
  export type armadaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the armada
     */
    select?: armadaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the armada
     */
    omit?: armadaOmit<ExtArgs> | null
  }


  /**
   * Model materials
   */

  export type AggregateMaterials = {
    _count: MaterialsCountAggregateOutputType | null
    _avg: MaterialsAvgAggregateOutputType | null
    _sum: MaterialsSumAggregateOutputType | null
    _min: MaterialsMinAggregateOutputType | null
    _max: MaterialsMaxAggregateOutputType | null
  }

  export type MaterialsAvgAggregateOutputType = {
    price_per_rit: Decimal | null
  }

  export type MaterialsSumAggregateOutputType = {
    price_per_rit: Decimal | null
  }

  export type MaterialsMinAggregateOutputType = {
    id: string | null
    name: string | null
    price_per_rit: Decimal | null
    created_at: Date | null
  }

  export type MaterialsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    price_per_rit: Decimal | null
    created_at: Date | null
  }

  export type MaterialsCountAggregateOutputType = {
    id: number
    name: number
    price_per_rit: number
    created_at: number
    _all: number
  }


  export type MaterialsAvgAggregateInputType = {
    price_per_rit?: true
  }

  export type MaterialsSumAggregateInputType = {
    price_per_rit?: true
  }

  export type MaterialsMinAggregateInputType = {
    id?: true
    name?: true
    price_per_rit?: true
    created_at?: true
  }

  export type MaterialsMaxAggregateInputType = {
    id?: true
    name?: true
    price_per_rit?: true
    created_at?: true
  }

  export type MaterialsCountAggregateInputType = {
    id?: true
    name?: true
    price_per_rit?: true
    created_at?: true
    _all?: true
  }

  export type MaterialsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which materials to aggregate.
     */
    where?: materialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of materials to fetch.
     */
    orderBy?: materialsOrderByWithRelationInput | materialsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: materialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` materials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` materials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned materials
    **/
    _count?: true | MaterialsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MaterialsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MaterialsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MaterialsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MaterialsMaxAggregateInputType
  }

  export type GetMaterialsAggregateType<T extends MaterialsAggregateArgs> = {
        [P in keyof T & keyof AggregateMaterials]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaterials[P]>
      : GetScalarType<T[P], AggregateMaterials[P]>
  }




  export type materialsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: materialsWhereInput
    orderBy?: materialsOrderByWithAggregationInput | materialsOrderByWithAggregationInput[]
    by: MaterialsScalarFieldEnum[] | MaterialsScalarFieldEnum
    having?: materialsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MaterialsCountAggregateInputType | true
    _avg?: MaterialsAvgAggregateInputType
    _sum?: MaterialsSumAggregateInputType
    _min?: MaterialsMinAggregateInputType
    _max?: MaterialsMaxAggregateInputType
  }

  export type MaterialsGroupByOutputType = {
    id: string
    name: string
    price_per_rit: Decimal | null
    created_at: Date | null
    _count: MaterialsCountAggregateOutputType | null
    _avg: MaterialsAvgAggregateOutputType | null
    _sum: MaterialsSumAggregateOutputType | null
    _min: MaterialsMinAggregateOutputType | null
    _max: MaterialsMaxAggregateOutputType | null
  }

  type GetMaterialsGroupByPayload<T extends materialsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MaterialsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MaterialsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MaterialsGroupByOutputType[P]>
            : GetScalarType<T[P], MaterialsGroupByOutputType[P]>
        }
      >
    >


  export type materialsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price_per_rit?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["materials"]>

  export type materialsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price_per_rit?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["materials"]>

  export type materialsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price_per_rit?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["materials"]>

  export type materialsSelectScalar = {
    id?: boolean
    name?: boolean
    price_per_rit?: boolean
    created_at?: boolean
  }

  export type materialsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "price_per_rit" | "created_at", ExtArgs["result"]["materials"]>

  export type $materialsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "materials"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      price_per_rit: Prisma.Decimal | null
      created_at: Date | null
    }, ExtArgs["result"]["materials"]>
    composites: {}
  }

  type materialsGetPayload<S extends boolean | null | undefined | materialsDefaultArgs> = $Result.GetResult<Prisma.$materialsPayload, S>

  type materialsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<materialsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MaterialsCountAggregateInputType | true
    }

  export interface materialsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['materials'], meta: { name: 'materials' } }
    /**
     * Find zero or one Materials that matches the filter.
     * @param {materialsFindUniqueArgs} args - Arguments to find a Materials
     * @example
     * // Get one Materials
     * const materials = await prisma.materials.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends materialsFindUniqueArgs>(args: SelectSubset<T, materialsFindUniqueArgs<ExtArgs>>): Prisma__materialsClient<$Result.GetResult<Prisma.$materialsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Materials that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {materialsFindUniqueOrThrowArgs} args - Arguments to find a Materials
     * @example
     * // Get one Materials
     * const materials = await prisma.materials.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends materialsFindUniqueOrThrowArgs>(args: SelectSubset<T, materialsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__materialsClient<$Result.GetResult<Prisma.$materialsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Materials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {materialsFindFirstArgs} args - Arguments to find a Materials
     * @example
     * // Get one Materials
     * const materials = await prisma.materials.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends materialsFindFirstArgs>(args?: SelectSubset<T, materialsFindFirstArgs<ExtArgs>>): Prisma__materialsClient<$Result.GetResult<Prisma.$materialsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Materials that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {materialsFindFirstOrThrowArgs} args - Arguments to find a Materials
     * @example
     * // Get one Materials
     * const materials = await prisma.materials.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends materialsFindFirstOrThrowArgs>(args?: SelectSubset<T, materialsFindFirstOrThrowArgs<ExtArgs>>): Prisma__materialsClient<$Result.GetResult<Prisma.$materialsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Materials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {materialsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Materials
     * const materials = await prisma.materials.findMany()
     * 
     * // Get first 10 Materials
     * const materials = await prisma.materials.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const materialsWithIdOnly = await prisma.materials.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends materialsFindManyArgs>(args?: SelectSubset<T, materialsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$materialsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Materials.
     * @param {materialsCreateArgs} args - Arguments to create a Materials.
     * @example
     * // Create one Materials
     * const Materials = await prisma.materials.create({
     *   data: {
     *     // ... data to create a Materials
     *   }
     * })
     * 
     */
    create<T extends materialsCreateArgs>(args: SelectSubset<T, materialsCreateArgs<ExtArgs>>): Prisma__materialsClient<$Result.GetResult<Prisma.$materialsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Materials.
     * @param {materialsCreateManyArgs} args - Arguments to create many Materials.
     * @example
     * // Create many Materials
     * const materials = await prisma.materials.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends materialsCreateManyArgs>(args?: SelectSubset<T, materialsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Materials and returns the data saved in the database.
     * @param {materialsCreateManyAndReturnArgs} args - Arguments to create many Materials.
     * @example
     * // Create many Materials
     * const materials = await prisma.materials.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Materials and only return the `id`
     * const materialsWithIdOnly = await prisma.materials.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends materialsCreateManyAndReturnArgs>(args?: SelectSubset<T, materialsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$materialsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Materials.
     * @param {materialsDeleteArgs} args - Arguments to delete one Materials.
     * @example
     * // Delete one Materials
     * const Materials = await prisma.materials.delete({
     *   where: {
     *     // ... filter to delete one Materials
     *   }
     * })
     * 
     */
    delete<T extends materialsDeleteArgs>(args: SelectSubset<T, materialsDeleteArgs<ExtArgs>>): Prisma__materialsClient<$Result.GetResult<Prisma.$materialsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Materials.
     * @param {materialsUpdateArgs} args - Arguments to update one Materials.
     * @example
     * // Update one Materials
     * const materials = await prisma.materials.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends materialsUpdateArgs>(args: SelectSubset<T, materialsUpdateArgs<ExtArgs>>): Prisma__materialsClient<$Result.GetResult<Prisma.$materialsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Materials.
     * @param {materialsDeleteManyArgs} args - Arguments to filter Materials to delete.
     * @example
     * // Delete a few Materials
     * const { count } = await prisma.materials.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends materialsDeleteManyArgs>(args?: SelectSubset<T, materialsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Materials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {materialsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Materials
     * const materials = await prisma.materials.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends materialsUpdateManyArgs>(args: SelectSubset<T, materialsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Materials and returns the data updated in the database.
     * @param {materialsUpdateManyAndReturnArgs} args - Arguments to update many Materials.
     * @example
     * // Update many Materials
     * const materials = await prisma.materials.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Materials and only return the `id`
     * const materialsWithIdOnly = await prisma.materials.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends materialsUpdateManyAndReturnArgs>(args: SelectSubset<T, materialsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$materialsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Materials.
     * @param {materialsUpsertArgs} args - Arguments to update or create a Materials.
     * @example
     * // Update or create a Materials
     * const materials = await prisma.materials.upsert({
     *   create: {
     *     // ... data to create a Materials
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Materials we want to update
     *   }
     * })
     */
    upsert<T extends materialsUpsertArgs>(args: SelectSubset<T, materialsUpsertArgs<ExtArgs>>): Prisma__materialsClient<$Result.GetResult<Prisma.$materialsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Materials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {materialsCountArgs} args - Arguments to filter Materials to count.
     * @example
     * // Count the number of Materials
     * const count = await prisma.materials.count({
     *   where: {
     *     // ... the filter for the Materials we want to count
     *   }
     * })
    **/
    count<T extends materialsCountArgs>(
      args?: Subset<T, materialsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MaterialsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Materials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MaterialsAggregateArgs>(args: Subset<T, MaterialsAggregateArgs>): Prisma.PrismaPromise<GetMaterialsAggregateType<T>>

    /**
     * Group by Materials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {materialsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends materialsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: materialsGroupByArgs['orderBy'] }
        : { orderBy?: materialsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, materialsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the materials model
   */
  readonly fields: materialsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for materials.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__materialsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the materials model
   */
  interface materialsFieldRefs {
    readonly id: FieldRef<"materials", 'String'>
    readonly name: FieldRef<"materials", 'String'>
    readonly price_per_rit: FieldRef<"materials", 'Decimal'>
    readonly created_at: FieldRef<"materials", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * materials findUnique
   */
  export type materialsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the materials
     */
    select?: materialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the materials
     */
    omit?: materialsOmit<ExtArgs> | null
    /**
     * Filter, which materials to fetch.
     */
    where: materialsWhereUniqueInput
  }

  /**
   * materials findUniqueOrThrow
   */
  export type materialsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the materials
     */
    select?: materialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the materials
     */
    omit?: materialsOmit<ExtArgs> | null
    /**
     * Filter, which materials to fetch.
     */
    where: materialsWhereUniqueInput
  }

  /**
   * materials findFirst
   */
  export type materialsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the materials
     */
    select?: materialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the materials
     */
    omit?: materialsOmit<ExtArgs> | null
    /**
     * Filter, which materials to fetch.
     */
    where?: materialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of materials to fetch.
     */
    orderBy?: materialsOrderByWithRelationInput | materialsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for materials.
     */
    cursor?: materialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` materials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` materials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of materials.
     */
    distinct?: MaterialsScalarFieldEnum | MaterialsScalarFieldEnum[]
  }

  /**
   * materials findFirstOrThrow
   */
  export type materialsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the materials
     */
    select?: materialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the materials
     */
    omit?: materialsOmit<ExtArgs> | null
    /**
     * Filter, which materials to fetch.
     */
    where?: materialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of materials to fetch.
     */
    orderBy?: materialsOrderByWithRelationInput | materialsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for materials.
     */
    cursor?: materialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` materials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` materials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of materials.
     */
    distinct?: MaterialsScalarFieldEnum | MaterialsScalarFieldEnum[]
  }

  /**
   * materials findMany
   */
  export type materialsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the materials
     */
    select?: materialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the materials
     */
    omit?: materialsOmit<ExtArgs> | null
    /**
     * Filter, which materials to fetch.
     */
    where?: materialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of materials to fetch.
     */
    orderBy?: materialsOrderByWithRelationInput | materialsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing materials.
     */
    cursor?: materialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` materials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` materials.
     */
    skip?: number
    distinct?: MaterialsScalarFieldEnum | MaterialsScalarFieldEnum[]
  }

  /**
   * materials create
   */
  export type materialsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the materials
     */
    select?: materialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the materials
     */
    omit?: materialsOmit<ExtArgs> | null
    /**
     * The data needed to create a materials.
     */
    data: XOR<materialsCreateInput, materialsUncheckedCreateInput>
  }

  /**
   * materials createMany
   */
  export type materialsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many materials.
     */
    data: materialsCreateManyInput | materialsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * materials createManyAndReturn
   */
  export type materialsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the materials
     */
    select?: materialsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the materials
     */
    omit?: materialsOmit<ExtArgs> | null
    /**
     * The data used to create many materials.
     */
    data: materialsCreateManyInput | materialsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * materials update
   */
  export type materialsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the materials
     */
    select?: materialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the materials
     */
    omit?: materialsOmit<ExtArgs> | null
    /**
     * The data needed to update a materials.
     */
    data: XOR<materialsUpdateInput, materialsUncheckedUpdateInput>
    /**
     * Choose, which materials to update.
     */
    where: materialsWhereUniqueInput
  }

  /**
   * materials updateMany
   */
  export type materialsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update materials.
     */
    data: XOR<materialsUpdateManyMutationInput, materialsUncheckedUpdateManyInput>
    /**
     * Filter which materials to update
     */
    where?: materialsWhereInput
    /**
     * Limit how many materials to update.
     */
    limit?: number
  }

  /**
   * materials updateManyAndReturn
   */
  export type materialsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the materials
     */
    select?: materialsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the materials
     */
    omit?: materialsOmit<ExtArgs> | null
    /**
     * The data used to update materials.
     */
    data: XOR<materialsUpdateManyMutationInput, materialsUncheckedUpdateManyInput>
    /**
     * Filter which materials to update
     */
    where?: materialsWhereInput
    /**
     * Limit how many materials to update.
     */
    limit?: number
  }

  /**
   * materials upsert
   */
  export type materialsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the materials
     */
    select?: materialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the materials
     */
    omit?: materialsOmit<ExtArgs> | null
    /**
     * The filter to search for the materials to update in case it exists.
     */
    where: materialsWhereUniqueInput
    /**
     * In case the materials found by the `where` argument doesn't exist, create a new materials with this data.
     */
    create: XOR<materialsCreateInput, materialsUncheckedCreateInput>
    /**
     * In case the materials was found with the provided `where` argument, update it with this data.
     */
    update: XOR<materialsUpdateInput, materialsUncheckedUpdateInput>
  }

  /**
   * materials delete
   */
  export type materialsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the materials
     */
    select?: materialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the materials
     */
    omit?: materialsOmit<ExtArgs> | null
    /**
     * Filter which materials to delete.
     */
    where: materialsWhereUniqueInput
  }

  /**
   * materials deleteMany
   */
  export type materialsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which materials to delete
     */
    where?: materialsWhereInput
    /**
     * Limit how many materials to delete.
     */
    limit?: number
  }

  /**
   * materials without action
   */
  export type materialsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the materials
     */
    select?: materialsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the materials
     */
    omit?: materialsOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DriversScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    created_at: 'created_at'
  };

  export type DriversScalarFieldEnum = (typeof DriversScalarFieldEnum)[keyof typeof DriversScalarFieldEnum]


  export const ArmadaScalarFieldEnum: {
    id: 'id',
    owner: 'owner',
    plat_nomor: 'plat_nomor',
    keterangan: 'keterangan',
    created_at: 'created_at'
  };

  export type ArmadaScalarFieldEnum = (typeof ArmadaScalarFieldEnum)[keyof typeof ArmadaScalarFieldEnum]


  export const MaterialsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price_per_rit: 'price_per_rit',
    created_at: 'created_at'
  };

  export type MaterialsScalarFieldEnum = (typeof MaterialsScalarFieldEnum)[keyof typeof MaterialsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type driversWhereInput = {
    AND?: driversWhereInput | driversWhereInput[]
    OR?: driversWhereInput[]
    NOT?: driversWhereInput | driversWhereInput[]
    id?: UuidFilter<"drivers"> | string
    name?: StringFilter<"drivers"> | string
    phone?: StringNullableFilter<"drivers"> | string | null
    created_at?: DateTimeNullableFilter<"drivers"> | Date | string | null
  }

  export type driversOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
  }

  export type driversWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: driversWhereInput | driversWhereInput[]
    OR?: driversWhereInput[]
    NOT?: driversWhereInput | driversWhereInput[]
    name?: StringFilter<"drivers"> | string
    phone?: StringNullableFilter<"drivers"> | string | null
    created_at?: DateTimeNullableFilter<"drivers"> | Date | string | null
  }, "id">

  export type driversOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: driversCountOrderByAggregateInput
    _max?: driversMaxOrderByAggregateInput
    _min?: driversMinOrderByAggregateInput
  }

  export type driversScalarWhereWithAggregatesInput = {
    AND?: driversScalarWhereWithAggregatesInput | driversScalarWhereWithAggregatesInput[]
    OR?: driversScalarWhereWithAggregatesInput[]
    NOT?: driversScalarWhereWithAggregatesInput | driversScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"drivers"> | string
    name?: StringWithAggregatesFilter<"drivers"> | string
    phone?: StringNullableWithAggregatesFilter<"drivers"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"drivers"> | Date | string | null
  }

  export type armadaWhereInput = {
    AND?: armadaWhereInput | armadaWhereInput[]
    OR?: armadaWhereInput[]
    NOT?: armadaWhereInput | armadaWhereInput[]
    id?: UuidFilter<"armada"> | string
    owner?: StringNullableFilter<"armada"> | string | null
    plat_nomor?: StringNullableFilter<"armada"> | string | null
    keterangan?: StringNullableFilter<"armada"> | string | null
    created_at?: DateTimeNullableFilter<"armada"> | Date | string | null
  }

  export type armadaOrderByWithRelationInput = {
    id?: SortOrder
    owner?: SortOrderInput | SortOrder
    plat_nomor?: SortOrderInput | SortOrder
    keterangan?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
  }

  export type armadaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: armadaWhereInput | armadaWhereInput[]
    OR?: armadaWhereInput[]
    NOT?: armadaWhereInput | armadaWhereInput[]
    owner?: StringNullableFilter<"armada"> | string | null
    plat_nomor?: StringNullableFilter<"armada"> | string | null
    keterangan?: StringNullableFilter<"armada"> | string | null
    created_at?: DateTimeNullableFilter<"armada"> | Date | string | null
  }, "id">

  export type armadaOrderByWithAggregationInput = {
    id?: SortOrder
    owner?: SortOrderInput | SortOrder
    plat_nomor?: SortOrderInput | SortOrder
    keterangan?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: armadaCountOrderByAggregateInput
    _max?: armadaMaxOrderByAggregateInput
    _min?: armadaMinOrderByAggregateInput
  }

  export type armadaScalarWhereWithAggregatesInput = {
    AND?: armadaScalarWhereWithAggregatesInput | armadaScalarWhereWithAggregatesInput[]
    OR?: armadaScalarWhereWithAggregatesInput[]
    NOT?: armadaScalarWhereWithAggregatesInput | armadaScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"armada"> | string
    owner?: StringNullableWithAggregatesFilter<"armada"> | string | null
    plat_nomor?: StringNullableWithAggregatesFilter<"armada"> | string | null
    keterangan?: StringNullableWithAggregatesFilter<"armada"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"armada"> | Date | string | null
  }

  export type materialsWhereInput = {
    AND?: materialsWhereInput | materialsWhereInput[]
    OR?: materialsWhereInput[]
    NOT?: materialsWhereInput | materialsWhereInput[]
    id?: UuidFilter<"materials"> | string
    name?: StringFilter<"materials"> | string
    price_per_rit?: DecimalNullableFilter<"materials"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeNullableFilter<"materials"> | Date | string | null
  }

  export type materialsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    price_per_rit?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
  }

  export type materialsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: materialsWhereInput | materialsWhereInput[]
    OR?: materialsWhereInput[]
    NOT?: materialsWhereInput | materialsWhereInput[]
    name?: StringFilter<"materials"> | string
    price_per_rit?: DecimalNullableFilter<"materials"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeNullableFilter<"materials"> | Date | string | null
  }, "id">

  export type materialsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    price_per_rit?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: materialsCountOrderByAggregateInput
    _avg?: materialsAvgOrderByAggregateInput
    _max?: materialsMaxOrderByAggregateInput
    _min?: materialsMinOrderByAggregateInput
    _sum?: materialsSumOrderByAggregateInput
  }

  export type materialsScalarWhereWithAggregatesInput = {
    AND?: materialsScalarWhereWithAggregatesInput | materialsScalarWhereWithAggregatesInput[]
    OR?: materialsScalarWhereWithAggregatesInput[]
    NOT?: materialsScalarWhereWithAggregatesInput | materialsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"materials"> | string
    name?: StringWithAggregatesFilter<"materials"> | string
    price_per_rit?: DecimalNullableWithAggregatesFilter<"materials"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"materials"> | Date | string | null
  }

  export type driversCreateInput = {
    id?: string
    name: string
    phone?: string | null
    created_at?: Date | string | null
  }

  export type driversUncheckedCreateInput = {
    id?: string
    name: string
    phone?: string | null
    created_at?: Date | string | null
  }

  export type driversUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type driversUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type driversCreateManyInput = {
    id?: string
    name: string
    phone?: string | null
    created_at?: Date | string | null
  }

  export type driversUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type driversUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type armadaCreateInput = {
    id?: string
    owner?: string | null
    plat_nomor?: string | null
    keterangan?: string | null
    created_at?: Date | string | null
  }

  export type armadaUncheckedCreateInput = {
    id?: string
    owner?: string | null
    plat_nomor?: string | null
    keterangan?: string | null
    created_at?: Date | string | null
  }

  export type armadaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    plat_nomor?: NullableStringFieldUpdateOperationsInput | string | null
    keterangan?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type armadaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    plat_nomor?: NullableStringFieldUpdateOperationsInput | string | null
    keterangan?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type armadaCreateManyInput = {
    id?: string
    owner?: string | null
    plat_nomor?: string | null
    keterangan?: string | null
    created_at?: Date | string | null
  }

  export type armadaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    plat_nomor?: NullableStringFieldUpdateOperationsInput | string | null
    keterangan?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type armadaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    plat_nomor?: NullableStringFieldUpdateOperationsInput | string | null
    keterangan?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type materialsCreateInput = {
    id?: string
    name: string
    price_per_rit?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
  }

  export type materialsUncheckedCreateInput = {
    id?: string
    name: string
    price_per_rit?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
  }

  export type materialsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price_per_rit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type materialsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price_per_rit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type materialsCreateManyInput = {
    id?: string
    name: string
    price_per_rit?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
  }

  export type materialsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price_per_rit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type materialsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price_per_rit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type driversCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    created_at?: SortOrder
  }

  export type driversMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    created_at?: SortOrder
  }

  export type driversMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    created_at?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type armadaCountOrderByAggregateInput = {
    id?: SortOrder
    owner?: SortOrder
    plat_nomor?: SortOrder
    keterangan?: SortOrder
    created_at?: SortOrder
  }

  export type armadaMaxOrderByAggregateInput = {
    id?: SortOrder
    owner?: SortOrder
    plat_nomor?: SortOrder
    keterangan?: SortOrder
    created_at?: SortOrder
  }

  export type armadaMinOrderByAggregateInput = {
    id?: SortOrder
    owner?: SortOrder
    plat_nomor?: SortOrder
    keterangan?: SortOrder
    created_at?: SortOrder
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type materialsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price_per_rit?: SortOrder
    created_at?: SortOrder
  }

  export type materialsAvgOrderByAggregateInput = {
    price_per_rit?: SortOrder
  }

  export type materialsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price_per_rit?: SortOrder
    created_at?: SortOrder
  }

  export type materialsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price_per_rit?: SortOrder
    created_at?: SortOrder
  }

  export type materialsSumOrderByAggregateInput = {
    price_per_rit?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}