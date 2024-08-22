import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

// Pages
import { VehiclesComponent } from '@pages/vehicles/vehicles.component';
import { ClientsComponent } from '@pages/clients/clients.component';
import { OrdersComponent } from '@pages/orders/orders.component';
import { LoginComponent } from '@pages/login/login.component';
import { CatalogComponent } from '@pages/catalog/catalog.component';

// Guard
import { routeGuardGuard } from '@core/guards/route-guard.guard';
import { CatalogProfileComponent } from '@features/catalog/catalog-profile/catalog-profile.component';

export const routes: Routes = [
    {
        path: 'panel',
        children: [{
            path: 'dashboard',
            title: "AMX - Dashboard",
            component: DashboardComponent,
            canActivate: [routeGuardGuard],
            data: {
                roles: ["admin", "seller"]
            }
        },
        {
            path: 'vehicles',
            title: "AMX - Vehicles",
            canActivate: [routeGuardGuard],
            data: {
                roles: ["admin"]
            },
            children: [
                {
                    path: '',
                    component: VehiclesComponent,
                    data: {
                        step: 'list',
                        cardTitle: 'Vehicles',
                        cardSubTitle: 'List of vehicles'
                    }
                },
                {
                    path: 'new',
                    component: VehiclesComponent,
                    data: {
                        step: 'form',
                        cardTitle: 'New',
                        cardSubTitle: 'Create a vehicle'
                    }
                },
                {
                    path: ':id',
                    component: VehiclesComponent,
                    data: {
                        step: 'form',
                        cardTitle: 'Edit',
                        cardSubTitle: 'Update a vehicle'
                    }
                },
            ]
        },
        {
            path: 'orders',
            title: "AMX - Orders",
            data: {
                roles: ['admin', 'seller']
            },
            children: [
                {
                    path: '',
                    component: OrdersComponent,
                    data: {
                        step: 'list',
                        cardTitle: 'Orders',
                        cardSubTitle: 'List of orders'
                    }
                },
                {
                    path: 'new',
                    component: OrdersComponent,
                    data: {
                        step: 'form',
                        cardTitle: 'New',
                        cardSubTitle: 'Create a order'
                    }
                },
                {
                    path: ':id',
                    component: OrdersComponent,
                    data: {
                        step: 'form',
                        cardTitle: 'Edit',
                        cardSubTitle: 'Update a order'
                    }
                },
            ]
        },
        {
            path: 'clients',
            title: "AMX - Clients",
            data: {
                roles: ['admin', 'seller']
            },
            children: [
                {
                    path: '',
                    component: ClientsComponent,
                    data: {
                        step: 'list',
                        cardTitle: 'Clients',
                        cardSubTitle: 'List of clients'
                    }
                },
                {
                    path: 'new',
                    component: ClientsComponent,
                    data: {
                        step: 'form',
                        cardTitle: 'New',
                        cardSubTitle: 'Create a client'
                    }
                },
                {
                    path: ':id',
                    component: ClientsComponent,
                    data: {
                        step: 'form',
                        cardTitle: 'Edit',
                        cardSubTitle: 'Update a client'
                    }
                },
            ]
        }]
    },
    {
        path: 'login',
        title: "AMX - Login",
        component: LoginComponent
    },
    {
        path: 'home',
        title: "AMX - Home",
        data: {
            roles: ['client']
        },
        children: [
            {
                path: '',
                component: CatalogComponent,
            },
            {
                path: 'profile',
                redirectTo: ''
            },
            {
                path: 'profile/:id',
                component: CatalogProfileComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'panel/dashboard'
    },
];
