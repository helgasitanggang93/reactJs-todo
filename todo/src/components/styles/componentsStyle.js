const redUrgent = '#ef5350';
const blueDone = '#8aaae5';
const whiteText = '#ffffff';
const yellowText = '#fff748'; 
const fontStyleDetail = 'smaller'; 
const mainColor = '#3c1a5b';
const spaceTodoListComponent = '5px';
const zeroPx = '0px';
const fullHeightVh = '100vh';
const centerValue = 'center';
const widthCardTodo = '15rem';
const paddingLoginRegister = '15px'; 
const borderLoginRegister = '1px solid grey';
const widthImage = '300px';
const heightImage = '200px'
const displayType = 'flex'
const buttonBorderStyle = 'none'

export const paddingForList = {
  padding: spaceTodoListComponent
}

export const marginTopBetweenCreate = {
  marginTop: spaceTodoListComponent
}

export const textNavColor = {
  color: yellowText
}

export const navBaseColor = {
  backgroundColor: mainColor
}

export const contentTextColor = {
  color: whiteText
}

export const contentTextStyle = {
  fontSize: fontStyleDetail
}

export const spacingBetweenSortButton = { 
  marginLeft: paddingLoginRegister, 
  marginBottom: spaceTodoListComponent 
}

export const layoutDefaultSetting = {
  padding: zeroPx, 
  margin: zeroPx 
}

export const imageDetailCardStyle = {
  maxWidth: heightImage, 
  maxHeight: widthImage 
}

export const centerPosition = {
    height: fullHeightVh,
    display: displayType,
    alignItems: centerValue,
    justifyContent: centerValue
}

export const colorStatus = (status) => {
  if(status){
    if (status === "urgent") {
      return redUrgent;
    } else if (status === "done") {
      return blueDone;
    }
  }
}

export const buttonDetailsStyle = (status) => {
  return {
    backgroundColor: whiteText,
    color: colorStatus(status),
    borderStyle: buttonBorderStyle
  }
}

export const cardTodoStyle = (status) => {
  return { 
    width: widthCardTodo, 
    backgroundColor: colorStatus(status) }
}

export const headerDetailCardStyle = (status) => {
  return { 
    backgroundColor: colorStatus(status), 
    padding: zeroPx 
  }
}

export const loginRegisterFormPositionStyle = { 
  border: borderLoginRegister, 
  padding: paddingLoginRegister 
}