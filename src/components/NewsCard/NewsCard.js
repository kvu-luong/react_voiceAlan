import React, { useState, useEffect, createRef } from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

import classNames from 'classnames';

import useStyles from './style';
const NewsCard = ( { articles:{ description, publishedAt, source, title, url, urlToImage }, key, activeArticle}) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

    //set href for each card
    useEffect( () => {
        setElRefs( (refs) => Array(2).fill().map( (_, j) => refs[j] || createRef()))
    }, []);

    useEffect( ()=> {
        if(key === activeArticle && elRefs[activeArticle]){
            scrollToRef(elRefs[activeArticle]);
        }
    }, [key, activeArticle, elRefs]);

    return (
        <Card ref={elRefs[key]} className={classNames(classes.card, activeArticle === key ? classes.activeCard: null)}>
            <CardActionArea href={url} target="_blank">
                <CardMedia className={classes.media} image={urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'}/>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
                </div>
                <Typography className={classes.title} gutterbottom varient="h5">{title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary">Read More</Button>
                <Typography variant="h5" color="textSecondary">{key + 1}</Typography>
            </CardActions>
        </Card>
    )
}
export default NewsCard;