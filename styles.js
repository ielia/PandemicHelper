import { StyleSheet } from 'react-native';

export const cardButtonStyle = (backgroundColor, height = '100%', marginBottom = 0) => ({
    alignItems: 'center',
    backgroundColor,
    borderRadius: 3,
    elevation: 4, // Android
    height,
    justifyContent: 'center',
    marginBottom,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    width: '100%',
});

export const continueButtonBgColor = '#40A0FF';

export const pageGradientColors = ['#3F599B', '#576291', '#435482'];

export const resetButtonBgColor = '#FF8000';

export const selectCardButtonBgColor = '#40A0FF';

export const selectCardButtonFgColor = '#FFFFFF';

export const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        width: '100%',
    },
    mainContainer: {
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        width: '100%',
    },
    page: {
        flex: 1,
        width: '100%',
    },
    slider: {
        height: 50,
        width: '100%',
    }
});
