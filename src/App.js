import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import {  deleteMealMsg } from "./Update";

function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch(msg){
    if (msg.type === "ANSWER_SHOW") {
      const updatedModel = update(msg, model);
      model = updatedModel;
      const updatedView = view(dispatch, model);
      const patches = diff(currentView, updatedView);
      rootNode = patch(rootNode, patches);
      currentView = updatedView;
      if (updatedModel.nextId > 2) {
        dispatch(deleteMealMsg(updatedModel.nextId-1));
      } else {
        dispatch(deleteMealMsg(updatedModel.nextId-1));
      } 
    } else {
      model = update(msg, model);
      const updatedView = view(dispatch, model);
      const patches = diff(currentView, updatedView);
      rootNode = patch(rootNode, patches);
      currentView = updatedView;
    }
  }
}

export default app;