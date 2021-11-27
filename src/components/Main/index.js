import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Segment,
    Item,
    Dropdown,
    Divider,
    Button,
    Message,
} from 'semantic-ui-react';

import mindImg from '../../images/B4.png';

import {
    CATEGORIES,
    //NUM_OF_QUESTIONS,
    // DIFFICULTY,
    //QUESTIONS_TYPE,
    COUNTDOWN_TIME,
} from '../../constants';
import {shuffle} from '../../utils';

import Offline from '../Offline';
// import json_data from "../../constants/questions_roadsing.json";

const Main = ({startQuiz}) => {
    const [category, setCategory] = useState();
    // const [numOfQuestions, setNumOfQuestions] = useState(5);
    const [numOfQuestions] = useState(5);
    // const [difficulty, setDifficulty] = useState('0');
    //const [questionsType, setQuestionsType] = useState('0');
    //const [questionsType, setQuestionsType] = useState('0');
    const [countdownTime, setCountdownTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    //const [offline, setOffline] = useState(false);
    const [offline] = useState(false);
    const handleTimeChange = (e, {name, value}) => {
        setCountdownTime({...countdownTime, [name]: value});
    };

    let allFieldsSelected = false;
    if (
        category &&
        numOfQuestions &&
        (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
    ) {
        allFieldsSelected = true;
    }
    const getJSONData = (category) => {
        if (category === 1) {
            return require("../../constants/questions_roadsing.json")
        } else if (category === 2) {
            return require("../../constants/questions_drivecard.json")
        }

    }

    const fetchData = () => {

        const json_data = getJSONData(category)
        if (category === 1){
            json_data.results.forEach(element => {
                element.options = shuffle([
                    element.correct_answer,
                ], element.category, category);
            });
        }else if (category === 2){
            json_data.results.forEach(element => {
                element.options = shuffle([
                    element.correct_answer, ...element.incorrect_answers
                ], element.category, category);
            });
        }

        setProcessing(false);
        startQuiz(
            json_data.results,
            countdownTime.hours + countdownTime.minutes + countdownTime.seconds
        );

    };

    if (offline) return <Offline/>;

    return (
        <Container>
            <Segment>
                <Item.Group divided>
                    <Item>
                        <Item.Image src={mindImg}/>
                        <Item.Content>
                            <Item.Header>
                                <h1>Gratis körkortsfrågor / vägmarkeringar</h1>
                            </Item.Header>
                            {error && (
                                <Message error onDismiss={() => setError(null)}>
                                    <Message.Header>Error!</Message.Header>
                                    {error.message}
                                </Message>
                            )}
                            <Divider/>
                            <Item.Meta>
                                <Dropdown
                                    fluid
                                    selection
                                    name="category"
                                    placeholder="Välj kategori"
                                    header="Välj kategori"
                                    options={CATEGORIES}
                                    value={category}
                                    onChange={(e, {value}) => setCategory(value)}
                                    disabled={processing}
                                />
                                <br/>
                                {/*<Dropdown*/}
                                {/*    fluid*/}
                                {/*    selection*/}
                                {/*    name="numOfQ"*/}
                                {/*    placeholder="Select No. of Questions"*/}
                                {/*    header="Select No. of Questions"*/}
                                {/*    options={NUM_OF_QUESTIONS}*/}
                                {/*    value={numOfQuestions}*/}
                                {/*    onChange={(e, {value}) => setNumOfQuestions(value)}*/}
                                {/*    disabled={processing}*/}
                                {/*/>*/}
                                {/*<br/>*/}
                                {/*<Dropdown*/}
                                {/*    fluid*/}
                                {/*    selection*/}
                                {/*    name="difficulty"*/}
                                {/*    placeholder="Select Difficulty Level"*/}
                                {/*    header="Select Difficulty Level"*/}
                                {/*    options={DIFFICULTY}*/}
                                {/*    value={difficulty}*/}
                                {/*    onChange={(e, {value}) => setDifficulty(value)}*/}
                                {/*    disabled={processing}*/}
                                {/*/>*/}
                                {/*<br/>*/}
                                {/*<Dropdown*/}
                                {/*    fluid*/}
                                {/*    selection*/}
                                {/*    name="type"*/}
                                {/*    placeholder="Select Questions Type"*/}
                                {/*    header="Select Questions Type"*/}
                                {/*    options={QUESTIONS_TYPE}*/}
                                {/*    value={questionsType}*/}
                                {/*    onChange={(e, {value}) => setQuestionsType(value)}*/}
                                {/*    disabled={processing}*/}
                                {/*/>*/}
                                <br/>
                                {/*<Dropdown*/}
                                {/*  search*/}
                                {/*  selection*/}
                                {/*  name="hours"*/}
                                {/*  placeholder="Select Hours"*/}
                                {/*  header="Select Hours"*/}
                                {/*  options={COUNTDOWN_TIME.hours}*/}
                                {/*  value={countdownTime.hours}*/}
                                {/*  onChange={handleTimeChange}*/}
                                {/*  disabled={processing}*/}
                                {/*/>*/}
                                <Dropdown
                                    search
                                    selection
                                    name="minutes"
                                    placeholder="Välj tid"
                                    header="Välj tid i minut"
                                    options={COUNTDOWN_TIME.minutes}
                                    // value={countdownTime.minutes}
                                    value={countdownTime.minutes}
                                    onChange={handleTimeChange}
                                    disabled={processing}
                                />
                                {/*<Dropdown*/}
                                {/*  search*/}
                                {/*  selection*/}
                                {/*  name="seconds"*/}
                                {/*  placeholder="Select Seconds"*/}
                                {/*  header="Select Seconds"*/}
                                {/*  options={COUNTDOWN_TIME.seconds}*/}
                                {/*  value={countdownTime.seconds}*/}
                                {/*  onChange={handleTimeChange}*/}
                                {/*  disabled={processing}*/}
                                {/*/>*/}
                            </Item.Meta>
                            <Divider/>
                            <Item.Extra>
                                <Button
                                    primary
                                    size="big"
                                    icon="play"
                                    labelPosition="left"
                                    content={processing ? 'Processing...' : 'Play Now'}
                                    onClick={fetchData}
                                    disabled={!allFieldsSelected || processing}
                                />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <br/>
        </Container>
    );
};

Main.propTypes = {
    startQuiz: PropTypes.func.isRequired,
};

export default Main;
