/**
 * Created by irynazirukina on 2018-05-17.
 */
const rewireMobX = require('react-app-rewire-mobx');

module.exports = function override(config, env) {
    config = rewireMobX(config, env);
    return config;
}