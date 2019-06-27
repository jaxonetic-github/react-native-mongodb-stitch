import { Platform} from 'react-native';

import { withRouter as domRouter } from "react-router-dom";
import { withRouter as regRouter } from "react-router";

const withRouter = (Platform.OS === 'web') ? domRouter : regRouter;
 export default withRouter;