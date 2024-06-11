import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RoutingConfig, LoginRoutingConfig } from '../config/routeConfig';
import Layout from './Content';
// import Login from '../pages/Login/Login';

const route = () => {
	return (
		<Routes>
            {LoginRoutingConfig.map((data,key) =>(
                <Route path={data.path} element={data.component}/>

            ))}
			{RoutingConfig.map((data, key) => (
                <>
                    <Route path='/*' element={<Layout />}>
                        <Route
                            key={key}
                            path={data.path}
                            element={data.component} />
                    </Route>
                </>
            ))}
		</Routes>
	);
};

export default route;
