import React from 'react';

import { Box } from '@mui/material';
import WidgetDemoApp from '@iobroker/vis-2-widgets-react-dev/widgetDemoApp';
import { I18n } from '@iobroker/adapter-react-v5';

import translations from './translations';

import ConsumptionComparison from './ConsumptionComparison';
import Distribution from './Distribution';
import Consumption from './Consumption';
import IntervalSelector from './IntervalSelector';

const styles = {
    app: theme => ({
        backgroundColor: theme?.palette?.background.default,
        color: theme?.palette?.text.primary,
        height: '100%',
        width: '100%',
        overflow: 'auto',
        display: 'flex',
    }),
};

class App extends WidgetDemoApp {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            ...{
                timeInterval: 'week',
                timeStart: null,
            },
        };

        // init translations
        I18n.extendTranslations(translations);

        this.socket.registerConnectionHandler(this.onConnectionChanged);
    }

    setTimeInterval = timeInterval => {
        this.setState({ timeInterval });
    };

    setTimeStart = timeStart => {
        this.setState({ timeStart });
    };

    onConnectionChanged = isConnected => {
        if (isConnected) {
            this.socket.getSystemConfig()
                .then(systemConfig => this.setState({ systemConfig }));
        }
    };

    renderWidget() {
        return <Box sx={styles.app}>
            <Distribution
                socket={this.socket}
                themeType={this.state.themeType}
                style={{
                    width: 600,
                    height: 650,
                }}
                data={{
                    name: 'Distribution',
                    'powerLine-oid': 'javascript.0.random1',
                    oid1: 'javascript.0.random2',
                    oid2: 'javascript.0.random1',
                    oid3: 'javascript.0.random2',
                    nodesCount: 3,
                    powerLineColor: 'red',
                    color1: 'green',
                    range1: 10,
                    'g_level-1': true,
                    color2: 'blue',
                    range2: 2,
                    'g_level-2': true,
                    color3: 'yellow',
                    range3: 6,
                    'g_level-3': true,
                    max: 30,
                    min: 12,
                }}
            />
            <ConsumptionComparison
                socket={this.socket}
                themeType={this.state.themeType}
                style={{
                    width: 600,
                    height: 650,
                }}
                data={{
                    name: 'ConsumptionComparison',
                    devicesCount: 2,
                    oid1: 'javascript.0.random1',
                    name1: 'random1',
                    color1: 'rgba(28,71,38,1)',
                    oid2: 'javascript.0.random2',
                    name2: 'random2',
                    color2: 'rgba(201,83,80,1)',
                }}
            />
            <Consumption
                socket={this.socket}
                themeType={this.state.themeType}
                style={{
                    width: 600,
                    height: 650,
                }}
                context={{
                    systemConfig: this.state.systemConfig,
                    timeStart: this.state.timeStart,
                    setTimeStart: this.setTimeStart,
                    timeInterval: this.state.timeInterval,
                    setTimeInterval: this.setTimeInterval,
                }}
                data={{
                    name: 'Consumption',
                    devicesCount: 2,

                    oid1: 'javascript.0.temperatureActual',
                    name1: 'temperatureActual',
                    color1: 'rgba(28,71,38,1)',

                    oid2: 'javascript.0.temperatureActual',
                    // oid2: 'info.0.sysinfo.memory.info.active',
                    name2: 'memory',
                    color2: 'rgba(201,83,80,1)',
                }}
            />
            <IntervalSelector
                socket={this.socket}
                themeType={this.state.themeType}
                style={{
                    width: 600,
                    height: 650,
                }}
                data={{
                    name: 'IntervalSelector',
                    oid: 'javascript.0.temperatureActual',
                    levelsCount: 3,
                    color1: 'rgba(155,211,134,1)',
                    range1: 10,
                    'g_level-1': true,
                    color2: 'rgba(30,24,68,1)',
                    range2: 2,
                    'g_level-2': true,
                    color3: 'rgba(199,194,220,1)',
                    range3: 6,
                    'g_level-3': true,
                    max: 30,
                    min: 12,
                }}
                timeInterval={this.state.timeInterval}
                setTimeInterval={this.setTimeInterval}
                timeStart={this.state.timeStart}
                setTimeStart={this.setTimeStart}
            />
        </Box>;
    }
}

export default App;
