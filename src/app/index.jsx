import React from 'react';
import {Route, IndexRoute, HashRouter} from 'react-router-dom';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import IndexView from './components/index-view.jsx';
import BrowseView from './components/browse-view.jsx';
import AddFileView from './components/add-file-view.jsx';
import AboutView from './components/about-view.jsx';
import FileView from './components/file-view.jsx';
import dataReducer from './reducers/data-reducer';
import modalReducer from './reducers/modal-reducer';

var reducer = combineReducers({
	data: dataReducer,
	modal: modalReducer
});

var store = createStore(
	reducer,
	applyMiddleware(thunk)
);

var router = (
	<HashRouter>
		<Route path="/" component={IndexView}>
			<IndexRoute component={BrowseView}/>
			<Route path="addFile/" component={AddFileView}/>
			<Route path="about/" component={AboutView}/>
			<Route path="file/:id" component={FileView}/>
		</Route>
	</HashRouter>
);

export default (
	<Provider store={store}>{router}</Provider>);
