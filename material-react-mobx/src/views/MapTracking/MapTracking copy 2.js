import React, {Component} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        height: 750,
        overflowY: 'auto',
    },
};

const tilesData = [
    {
        img: 'assets/img/shiproute.png',
        title: 'Sunset',
        featured: true,
    },
    {
        img: 'assets/img/shiproute.png',
        title: 'Red',
    },
    {
        img: 'images/shiproute.png',
        title: 'Sunset Road',
    },

    {
        img: 'images/bridge.jpg',
        title: 'Sunset on the bridge',
        featured: true,
    },
    {
        img: 'images/fire.jpg',
        title: 'Fire',
    },
    {
        img: 'images/set.jpg',
        title: 'Set',
    }
];

export class GridListExampleComplex extends Component {
    render() {
        return (
            <div style={styles.root}>
                <GridList
                    cols={2}
                    cellHeight={200}
                    padding={1}
                    style={styles.gridList}>
                    {tilesData.map((tile) => (
                        <GridListTile
                            key={tile.img}
                            title={tile.title}
                            actionPosition="left"
                            titlePosition="bottom"
                            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                            cols={tile.featured ? 2 : 1}
                            rows={tile.featured ? 2 : 1}>
                            <img src={tile.img}/>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        )
    }
}


export default GridListExampleComplex;