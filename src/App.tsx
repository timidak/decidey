import './App.css';
import React, { MouseEvent, useRef } from 'react';
import ReactTooltip from 'react-tooltip';
import DecisionCard from './components/decision-card';
import OptionPill from './components/option-pill';
import arrowIcon from './icons/arrow-down-sign-to-navigate.svg';
import { 
  Headline, 
  Button, 
  ButtonContainer, 
  CheckBox, 
  CheckboxContainer, 
  CheckBoxLabel, 
  CheckBoxWrapper, 
  Container, 
  ContentContainer, 
  InputField, 
  Paragraph, 
  CardContainer, 
  Spacing,
  DecideButton,
  DecisionParagraph,
  Footer
} from './components';

function App() {
  const [options, setOptions] = React.useState<string[]>([]);
  const [decisions, setDecisions] = React.useState<string[]>([]);
  const [latestDecision, setLatestDecision] = React.useState<string>();
  const [isKoModeActive, setIsKoModeActive] = React.useState<boolean>(false);

  const last5 = decisions.slice(0, 5);
  let inputRef = useRef<HTMLInputElement>(null);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const option = inputRef.current?.value;
    if(option === 'testdata') {
      setOptions(['Lasagne', 'Pizza', 'Spaghetti', 'Schnitzel', 'Suppe']);
    } else if(option === '') {
      alert('Bitte etwas in Textfeld eingeben!');
    } else if (option) {
      setOptions([...options, option])
    }
    if (inputRef.current?.value) inputRef.current.value = '';
  }

  const removeOption = (option: string) => {
    if(option) {
      let i = 0; 
      while (i < options.length) {
        if(options[i] === option) {
          options.splice(i, 1);
          setOptions([...options]);
        } else {
          i++; 
        }
      }
    }
  }

  const resetOptions = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOptions([]);
    setDecisions([]);
    setLatestDecision('');
    console.log(options);
  }
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsKoModeActive(e.currentTarget.checked);
  }

  const makeDecision = () => {
    const randomNum = Math.floor(Math.random() * options.length);
    const option = options[randomNum]; 
    setDecisions([option,...decisions]);
    setLatestDecision(option);
    if(isKoModeActive) {
      removeOption(option);
    }
  };

  const tooltipMessage = 'Jede Option kann nur 1x ausgewählt werden.'

  return (
    <Container>
      <ContentContainer>
        <Headline>Decidey</Headline>
        <Paragraph>Optionen eingeben</Paragraph>
        <form onSubmit={onFormSubmit}>
          <InputField type="text" ref={inputRef} />
          <Spacing />
          <ButtonContainer>
            <Button type='submit'>Hinzufügen</Button>
            <Button onClick={resetOptions}>Zurücksetzen</Button>
          </ButtonContainer>
          <CheckboxContainer>
            <p data-tip={tooltipMessage}>
              <CheckBoxWrapper>
                <CheckBox id="checkbox" type="checkbox" onChange={handleCheckboxChange} />
                <CheckBoxLabel htmlFor="checkbox" />
              </CheckBoxWrapper>
            </p>
            <Paragraph>
              KO-Mode
            </Paragraph>
          </CheckboxContainer>
        </form>
        <Spacing />
        {options.map((option => (
          <CardContainer key='option'> 
            <OptionPill option={option} onDeleteClick={removeOption} isActive={latestDecision === option} />
          </CardContainer>
          )))}
        <Spacing />
        <Spacing />
        {options.length > 0 && (
        <DecideButton onClick={makeDecision}>Entscheiden</DecideButton>
          )}
        <Spacing />

        {decisions.length > 0 && (
        <>
          <DecisionParagraph>
            Entscheidung
          </DecisionParagraph>
              
          <img src={arrowIcon} height='15px' alt='arrowIcon' />
          <Spacing />

          {latestDecision && latestDecision !== '' && (
          <CardContainer>
            <DecisionCard decision={latestDecision} />
          </CardContainer>
              )}
          <Paragraph>
            Letzte 5 Entscheidungen
          </Paragraph>
          {last5.map((decision) => (
            <CardContainer key={decision}>
              <OptionPill option={decision} />
            </CardContainer>
                ))}
        </>
          )}

        <Spacing />
        <Spacing />
        <Spacing />
        <Spacing />
          
        <Footer>
          Made by Niko Kottre - 2021 &copy; - 
          {' '}
          <a href="https://xtheon.com">www.xtheon.com</a>
        </Footer>
        <ReactTooltip 
          place='bottom'
          type='light'
          effect='solid'
          multiline
        />
      </ContentContainer>
    </Container>
  );
}

export default App;
