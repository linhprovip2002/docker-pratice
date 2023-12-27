
import statisticalService from './statistical.service';
class statisticalController {
   public async getStatistical(req, res, next) {
        try {
             const { id } = req.params;
             // id user
             const { startDay, endDay } = req.body;
             const userId = req.userToken.IDUser;
             const result = await statisticalService.getStatistical(id, userId, startDay, endDay);
             res.status(200).json(result);
        } catch (error) {
             next(error);
        }
   }
   async getStatisticalAdmin(req, res, next) {
        try {
          const { startDay, endDay } = req.body;
          const result = await statisticalService.getStatisticalAdmin(startDay, endDay);
             res.status(200).json(result);
        } catch (error) {
             next(error);
        }
   }
}
export default new statisticalController();