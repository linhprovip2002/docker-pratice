
import statisticalService from './statistical.service';
class statisticalController {
   public async getStatistical(req, res, next) {
        try {
             const { id } = req.params;
             // id user
             const { year, month } = req.query;
             const userId = req.userToken.IDUser;
             const result = await statisticalService.getStatistical(id, userId, month, year );
             res.status(200).json(result);
        } catch (error) {
             next(error);
        }
   }
   async getStatisticalGrowth(req, res, next) {
        try {
             const { id } = req.params;
             const { year, month, yearCompare, monthCompare } = req.query;
             const userId = req.userToken.IDUser;
             const result = await statisticalService.getStatisticalGrowth(id, userId, month, year, yearCompare, monthCompare );
             res.status(200).json(result);
        } catch (error) {
             next(error);
        }
   }
}
export default new statisticalController();