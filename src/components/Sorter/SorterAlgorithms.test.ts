import { SorterArray } from "./SorterArray";
import { algorithms, SorterAlgorithmGenerator, SorterAlgorithmType } from './SorterAlgorithms'

describe('SorterAlgorithms', () => {
  const data = [0.382291345798047, 0.8403045256097629, 0.6171501902858507, 0.8080232300063867, 0.6106121387429818, 0.17741669830617424, 0.7584824993740581, 0.1473556727294867, 0.14559926430007197, 0.38221885135400957, 0.712582732199451, 0.3340510603196154, 0.3705314314183097, 0.6367691224693919, 0.9520613325744796, 0.11376555081021944, 0.9516147178878315, 0.5210793846604694, 0.9897863623550411, 0.2228907343204154, 0.8767401930678234, 0.1952830994941065, 0.7358407864521745, 0.004976905451752334, 0.29423063298340035, 0.07217507770351206, 0.741683183445619, 0.6243042342869373, 0.04435721541020399, 0.5170045786409279, 0.38691678727098566, 0.048851510074377824, 0.3950554377096157, 0.2242416028642521, 0.7959097539929272, 0.8871987344410385, 0.3994496843270249, 0.8783935699095503, 0.3823010960296209, 0.04085191652348408, 0.09899297537477725, 0.11081722566596364, 0.3016018953558709, 0.4499446763799435, 0.6063428673906402, 0.44380573496546605, 0.19625162596482515, 0.6235496616459388, 0.4545415636499144, 0.8843156382535764, 0.6324833777297598, 0.061898738207992965, 0.49774108959275964, 0.7028494852536864, 0.8428934803000037, 0.8490921456047829, 0.9753004275057726, 0.4937360944695096, 0.5926559657541874, 0.5636581789885501, 0.014870251801737955, 0.36789207515661493, 0.21586232368086966, 0.1498731182330314, 0.6387083210652162, 0.45948895925651956, 0.7732098147500782, 0.9676271302416868, 0.26527535387742907, 0.37382757371479824, 0.17129161942366578, 0.4973500868559064, 0.7536811566924186, 0.42696507830511754, 0.35084052029831114, 0.7451782452493882, 0.3292266839984771, 0.3658165395090549, 0.5717473139777961, 0.13592180454346514, 0.21368302725323085, 0.010551486212425742, 0.9813264755476101, 0.7674294852060144, 0.1886427610364505, 0.6565558620624249, 0.6623672392903219, 0.09318126073035127, 0.26080534156880864, 0.9879052064921053, 0.9853994959160386, 0.3911603705599851, 0.15057069653392785, 0.3743670638254032, 0.28005031503209954, 0.49794694120979877, 0.6644710182960202, 0.1597064098745874, 0.5570729503651694, 0.751902072318063];
  const compareFn = (i: number, j: number) => i-j;
  let array: SorterArray;
  let indicesSorted: Set<number>;

  beforeEach(() => {
    array = new SorterArray(data, compareFn);
    indicesSorted = new Set<number>()
  });

  describe.each(Object.entries(algorithms))('%s', (name: string, algorithm: SorterAlgorithmType) => {
    let generator: SorterAlgorithmGenerator;

    beforeEach(() => {
      
      generator = algorithm(array, indicesSorted);

      let i = 10000;
      while(!generator.next().done && i--) {}
    });

    it('returns immediatly if given an empty array', () => {
      generator = algorithm(new SorterArray([], compareFn), indicesSorted);

      expect(generator.next().done).toBeTruthy();
    });

    it('terminates', () => {
      expect(generator.next().done).toBeTruthy();
    });

    it('results in a sorted array', () => {
      for(let i = 0; i < array.length - 1; i++) {
        expect(compareFn(array.value(i), array.value(i+1))).toBeTruthy();
      }
    });

    it('marks all indices as sorted', () => {
      for(let i = 0; i < array.length; i++) {
        expect(indicesSorted.has(i)).toBeTruthy();
      }
    });
  });
});
