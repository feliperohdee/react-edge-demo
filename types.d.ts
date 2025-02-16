import { App, Config, Libs, Worker } from 'react-edge/types';
import type Rpc from '@/api/rpc';

declare type Config = Config;

declare namespace App {
	type Context = App.Context<Rpc> extends App.Context<infer T> ? App.Context<T> : never;
	type Route = App.Route<Rpc> extends App.Route<infer T> ? App.Route<T> : never;
	type RouteGroup = App.RouteGroup<Rpc> extends App.RouteGroup<infer T> ? App.RouteGroup<T> : never;
	type Router = App.Router<Rpc> extends App.Router<infer T> ? App.Router<T> : never;
	type WorkerContext = App.WorkerContext<Rpc> extends App.WorkerContext<infer T> ? App.WorkerContext<T> : never;

	export import Form = App.Form;
}

declare namespace Libs {
	type EphemeralCache = Libs.EphemeralCache;
	type MapStore = Libs.MapStore;
}

declare namespace Worker {
	interface Env extends Worker.Env {
		// add your cloudflare env variables here
	}

	export import AuthBasic = Worker.AuthBasic;
	export import AuthBearer = Worker.AuthBearer;
	export import AuthJwt = Worker.AuthJwt;
	export import EdgeCache = Worker.EdgeCache;
	export import Jwt = Worker.Jwt;
	export import Rpc = Worker.Rpc;
}
