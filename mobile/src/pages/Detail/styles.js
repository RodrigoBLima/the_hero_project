import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 16,
        marginTop: 48,

    },
    incidentProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
        marginTop: 24,

    },
    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        // marginBottom: 24,
        color: "#737380",
    },
    contactBox: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 16,
        // marginTop: 48,
    },
    heroTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#13131a',
        lineHeight: 30,
    },
    heroDescription: {
        fontSize: 15,
        color: '#737380',
        marginTop: 16,
    },
    actions: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    action: {
        backgroundColor: '#e02041',
        borderRadius:8,
        height:50,
        width:"48%",
        // color:"#FFF",
        // marginTop: 16,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionText: {
        // backgroundColor: '#e02041',
        // borderRadius:8,
        // height:50,
        // width:"80%",
        fontWeight: 'bold',
        fontSize: 15,
        color:"#FFF",
        // marginTop: 16,
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    // headerText: {
    //     fontSize: 15,
    //     color: '#737380',
    // },
    // headerTextBold: {
    //     fontWeight: "bold"
    // },
    // title: {
    //     fontSize: 30,
    //     marginBottom: 16,
    //     marginTop: 48,
    //     color: "#13131a",
    //     fontWeight: "bold"

    // },
    // description: {
    //     fontSize: 16,
    //     lineHeight: 24,
    //     color: "#737380",

    // },
    // incidentList: {
    //     marginTop: 32,

    // },

    // detailButton: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    // },
    // detailButtonText: {
    //     color: "#e02041",
    //     fontSize: 15,
    //     fontWeight: "bold",
    // },

})