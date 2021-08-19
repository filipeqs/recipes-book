import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shipping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'This is simply a test',
            'data:image/jpeg;base64,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',
            [new Ingredient('Meat', 1), new Ingredient('French Fires', 20)],
        ),
        new Recipe(
            'A Test Recipe 2',
            'This is simply a test 2',
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMUExYUFBQWFxYYGRwbGhkZGBgeIBofHxwZICAgHhsbHiohGRsmHBkcIjMjJistMDAwGiA1OjUvOSovMC0BCgoKDw4PHBERHC8oICYwLy8vLy8xLy8vMS8vMS8vLy8xLzAvMS8vLy8vMS8wLy8vLy8vLy8vLy8vLy8vLy8tL//AABEIANYA7AMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAFBgMEAAIHAf/EAEQQAAIBAgQDBQYCCQIFBAMBAAECEQMhAAQSMQVBUQYiYXGBEzKRobHwwdEHI0JSYnKC4fEUM0OSorLCFSRzg0RT0hb/xAAaAQACAwEBAAAAAAAAAAAAAAABAgMEBQAG/8QALxEAAgEDAwIDCAIDAQAAAAAAAAECAxEhBBIxQVEiYYEFExQycZGhwbHR4fDxFf/aAAwDAQACEQMRAD8At9nMlGqs2/upPzb8PjiHtHxUqmgc7sfDp69fPfEz8UQr3YVR3Vjw5+ImfjhG7R5/W8KbdevjgXCevmNbALtz/PBfh94Xnb79Pjt1OBvDuGvp1EQItPl03jBnhyFTqgRYSNh0EWgk+m2OUkdZjXw1AIkWAmfL7+5wU12M+d/xwspn12FwOXj03v8A28cE/wDUfq567259L/flhgCN28qKDHU+vr15fe6ZwzLO76UVixmABy89hHU+GHbP8JbNO1R3FKhTnVUboN4m0eO3mbYs8O1smnJp7KiP/wAioO88c0U3Mz77QOgGFuEBNlKdAha7s9T/APXTEwLXZmIjrJI3G++JK9Ggw7jsJiFZAZPOSGtE8pG+BHFKFai8VJ0k2bzM3PXxvM7nFrKV7GI/qiJ8QPvywUmB4Lmbyb06ZcDu3ExO0zc2DR8JwEOb9qR0w38K4zRX9RWP6qtNN2MzTYzDyZ2bT5X6RgPxDs41E1EIGumxBMQN97fskX8rYZCkjsP9MCvJ2DHpIUj78PPBfs0NIao3ulW/pMbnwMH19JqcMdINFtJSpHeU7OAPkTI+GJ+H1zSrGiQSh1KfDeL87R64ydRFxm/MjlyCeP66eaYarVVXbqBpj5fMY2y6ED9o3i9iQOnhY+O+I+0Sk10m5gnzu33643AgEHe/O1467GbGf7Yu6aW6CY0XgxqgVpFze+8bbHnz63xGKkiDexAsI/Lx/wA48CiRJMwJM2NrzbreMaV6XesSRbkL26yZAsPU4nuPY2pZbu3F52IsQRI87KfC/haGrkRbUtjI5gjSsyZ9L9OfS1WzDONJJUDkLzuZ8bHEwkKAZiDJJgg297qbk28cNcAJFFxqKgaSZhSIEmbTMiDF7/PFjJ1ipnfY/MXjnJI+Jx5mKtmCjeJPWw3nfbENOeZtz+UeeFYQnVUNBBYE38B87bTvz+FFMpLaSZ8Np/HEVOsRv0v8D8sT08xqIIIHX0wsoJ5ZzSZpnMuCrKQRtYWgi+39sB3pRTc2vcdbH63w0V6gILgAC59RYfP64XqoASqLbcvP6b4LCgDnv9xvPEajEuf/ANxvP8BiFcBjIkAufPHgOPQbHzxkYA6HjiOcZbeA+c/X8TjbszkDXqFyJVTboWtv4Cx9RynFDj7QCeXXy/z8sdK7FcH9nSpqRcKNX8zSW+ZPpGBJiot0eFfqze/iNz9cWclwImkzCJHKNx4jmMMzZBVSTy3jlfc+H5417Pv3ihIjvDzIiT8MdtOuch43SfK5hAZ9nUkpJmCCAVnnpMG/Iqd5w7pltdNdRhIljtCgHmeo6/ice/pT4OHylR1s1AiqvgFs/wD0Fj5gYHcMzXt+H7xrTS/hyYxPTUfTDJgaB+fopmWUMD7BIK07gNaQXWL2IgbCLycFljT0AB+Hpt/fFvIUA1JGgXAYiOZubdZJxrUUL3d+v0t13j1HlgoAB4hSVgUYAz1iL2/v6YSOJZEUH1Kf1ZkCd19ekRfxw3cTeGO07GNt7wZ8QPEkjlZZzuqqSqgkKJMkAKOZZjCqs8yQNsHgBTp5pCACJFjE9IuANz/fB9wc9RFEx/qKY00yZiogWdJvZ1AME8jG4wtVaVJF1a9Q5lVOmeWnVdzYXIVehOB9TjTqCEAAIgk94nzHu/EGMDeugypS5GccOZRpeokqIKK2tjAtIUEz5n++4ztVSCxpyBALsoYgbTLgkx4YU+GVHquFdzp5gmALj9nb4DBs8Hcywou4FiaakzO0xscVq04vwyVy5Q0KnHc2T90s7NVpl3Mk+0Uf8sMYjzxtUotUnSUPgKlPr0kD/OLWX7C5iqFZgKMDncn4WFupwx8M7DUxScVdIdZOva3IxsIwvxG1KyG+EprFxQ9hUAOpahAI2XV81+nhiCbtC3tEe8J5EX5R6YZKfYwpBfMOGa4NO6rvECCet7YAdocnXysNUanmKcxqZYYT/EO8vmDjqOupVJbU8+otbQzhHclgkp07z8Ym357H4Y2BB2nfr9xzxQyXEKNWwdqbGO7U7y26PuLE7yb4mrK6ECopUm4Mzq8mBgi2LhQaZJQ03Hwv8eWIyHHLmLwCOeLCRB5dfs+WPTWABUfvXMb+V/HBADGWbW+xjfLqV3H2efTli1mu9JABMybfj988ZpEeAH+B446wSNmkEcp+G45eBN8CKzd2pv7s/Mc8F9ICx9+vX/GBGaYaHAMyv4jCPkZAfPH9Y3p9BiJcSZ73z6fQYjQYIUSJzx7GNRzxsScAYdM5l9dbL0/36iz/ACgyfiAcdo4AoEE8zOOR5a+dy38zfJHx1fhtYDSo3In0n7+eEfzIC4CmfzYc+zJgfUSDizwmnDaovcDyP+PTAPOUmNTUL6dh99Rg7wlu8viN+v2MSIVm/FsqKgKsBDqQR5iD9cch/R45BfLsfcZlIvyt1v3ht0x2viC3U9bY5H2Pyw/1mfEWXMVBb/5HOO6ndA1lc09DMPRYD2FWWoMP2GjU9Mxy1BmB/ijmIr8WrBZ6k/P8f8YM8Tyy1FFNu6QylWBujg903Gw5+BIxz/tBxkU0Zq66WBZdEnvusggRcUw27DlAFzbuAFbiWbRB7SoxEzpiNTAfu8gBsXPdHibELQzvtu6NISZWkJ0zyZibu/8AE1720C2AWZr1My5d297kBAAGwAFlUCwGw+eGjgPAjB0zqADD/OKmp1EaccsvafSylkvf/wCSrNSZ2QAqZ3JBEbydvhheznZ12IREGve3447V2YoM+VCViNbBtRBO0QJ6WiYgSCRjOy3ZqlRSDDMx1FhJBG4Cg3Ag7Yo1q8qcVOP+C1TcUpRn0ODVuDZij3mRlUW1CQPzicOnZ7PVcvT10a4YEd5TeGiJixt+GOldq6NJKZYpqUWIC6iZgDTHOT8JNonHF8vxp8tVYqhCNOukx3E8it1bxHrhdPqampTurNdUTLZGF4p2fR5H/gnbymy6cyoBkA6QSCDzIiwm0X3xLxmjUqv7aijmmoiWsCJ2CyJHjzthd4RTXMI9apSUQD3gCPUgE35T5YOZLPPSWFIem1pDapMGDMmVjEWprSs4pZRd02lS8cbXfR8f9PaGW9quvXoVRpEzMjkfu84S+2eYXQ9PXqhtIJkHYH4X8caV+OFKjoWgHofz+GKub4fVrTUNlJtNiSx94DmJ54OnoOElOfHKLNWTnCUFnpbsD+zPZxq1ZUaVSNRaQLRJ7xgAR446TmOBLSy00tNSm1/YtqZYtF2JKsOTCB4DCVRNagy0jKE7MDEzbedrxy38cdK4cD7HQocoqyptNRWFt7GcHXamrG04vF/RmdDR04xt9zn/APplZTUy5Z1WQ9JrvT6gR74HqY6xOKlOqrCQYBvMg/Pn54i42z0M5roTJvpEmY5GOfOeWDGZyIzNNsxRBWoADWoxB5ksByMEmIg3PXGzRqqcE+6MTUaeUJtJYQs5x2L7kbAAEj6c5vi/wxiO6xMHnOx+/rikhhwwGoC8A7430uyym95XY+gmTGK9Vu9rmdNtMu5qqNJiecxHjfzwHrXWpH7v0YDbF9nIg+nnvf4AYHO579iAVta267eXd+I64noz3RyTU5bkB84e/wCi/wDaMaYmzv8AuHyX/tGITiYlRtO/30xtGNBj2T1xwTpa0Cteg4/YqQfJ1ZZ+JGOjcOzIGmd4+Mf5wgZ7MFWKvvyfaTynpEbi2DOX4mSF07G/xxDPDuNHKHShWDsRIthh4Yg+/XCZwaqszhy4ZmEUXb1PPDpi2LmZ94C0QIEfdsc77M5ZUFaqfer5irVB8GqNo9NMH1w18T4idLsnvt3KfizSAfIXY+CnAl6C0k07KihV9BH064aLFYK4znUpBqtQn2VGGbTuxJ7qD+Jmt5ascN7R8bqZyu9aqZLGwEwoGyr0UD43O5OGT9IfFGeouWUk6TqcctZERHVUMebuOWANThBRQWEflhalVRdmWKFCU8ot9nEo39se6P2ZuZta++HngvHMtTSmDKKJBIVzG9zpktuN8I9TKnTKICZIk9RJ2Pp92xrn8tUeCsgjeTvtyAgDwGM6rRhVfifoaktTCitsrWt6nYuzXaHKBzSpVfekLqlO9BMd/Zp8P2h0xDT4tWy+YL1WFSbVFW4m116QCRF/Xly7IcKr1qhiixVQSzCDIkkmdjYbR6Y6zT7OqUpjUoUIBI1d4C1wSSdokmMVNW4wSjfBLp5UXeT+WWPML1s+M2h9mFZDEkttIP7MX5CLdcc0/SBwylSgIlwDLapN/pcc/HBriWUqZGk703NpBMRqnqI2BI8bfHn+Zz9evGt+7IEQYF+Z5kATz+VoNHRk574ywmWYQVNWg7xfC/saf0fZoFBRMS+oX5kDVEHewMdIwz16Qp0arOph2IQEWnvCN+e/rGE3s9VOXrpXlSiFwwW7RFiFI57yPHDZ2q7VUXy+lNRWARoEHckqZNgRYiL332EmopXm7dbfyNLfFxUVjF/QTuH8ANbMI1iWJGkj3YJu38Np8cOHFKKUAFiVkg6gDAFwwN4W1hbbADsB2ioUa7qwdmqECmQgAuNiC3dUH6YJ8V4qtYnRoVIIAJWLTOkLINuU8sR6mFRySfCG9+nVtFWjy/Ni9xhhmmFJCNU+8ekb+cW9cOvDeGezpijUrk1HgqoBAECI3uIjCNnqX+nFOtSXX+rBbUY0sx92B7tiDG8MOturcFqI5RmpxVKkBhJ7o/eaO6ZxbhTjtUHx0v8Ako6yrKL3QvYA5Psw1JjUIDEvEsABebwRP+Bih2myj0AuYpgLVTeLCoOakRbbflvil2y7S5mhXWmXBG7UyBFog7Ai8wfCcWuH5mpxKmafdphLEA78iZPKD64rainKlUjVjhLn/g8VKcPG1YT+0WSVqS53LWpuRrWB+rZjzAtpLDSejeYwM4dxUr/uUyfFfv8AHDdTyqcOqChVDPlszKNrsFY8j/MIvygHlha4rw05etUoMSQsFGO7I11bwMWPiDjbgoaiG5cHntRQUZWZBmKqE6lDbgkRz8PjgRmDBIm0W36jl6DF3NtuAbH4W8PvbA+u5gAmYty8/qT9jE0KagrIjirFHOHv+i/9oxCMS5gd70X6DEIw45v1xtjzr98jj2MAI/mppmi9xcITy6Any28MWcgTSEMGamTaI1L5TEr/AAz5EXmPPUAbcoEX5ACLzvHPFvg9Rx3WGocj0PiOdvs45pNATsE6WfKkaHDLyYarEcipAKnw8RBIvi4e0egA1CwBMAKLsegm0+JgDF3s1wVWesoHdNEsJvDKyQfgWHrin2iyQU0yAIEmRaIg/Da2I/d2Y+/A18Nl1Wq8A3CpeEneCYLMYu1pi0C2KXabiQo0XdrhFLfzG0L/AFMQv9WKnCeIggCYI5ffx8zhX/SlxGKSUgf9x5P8qAE/9Tof/rxLeyEjHdJIQOGsXqtVqNcyzE8yZJPmWJPxwxUcsczVVAxIJgjw8yN7HwHwws1K4HdUyBz8fywWyeeanTDoRq5QbieeM2vGTe5c8I1Ks/dUWocjdxQZSgPZhRUqDe5N/Te/PASnXNRm1aUCgtCgCw6+MYi4JmqSn2lUktIIHWDP4fPEGQovUaoxlUYmT4T16YqRpqN7/f8AowVGUpPqx07OZJFbL1Bq0120MCbNaYKgwQTbDrxvhDIoam2kGJXTN51RtbvDAnsrw2m4oVCWK0f9uCNLErHqIG/l4zY4txyrTT2tTQUUEBACDrUxqMz3CQBM29L1ko1FZ83x5Z/o2NFCpTV36piZx3ilVjUy7uzv3SpCk3ZQCFECfWbm2wwoVKYTQuph3yHFrjURE85AB6QZ8cS8a49ma1TW6ppkAC5iCQC0jVAkiSNwDAw18E4ac5URnC0nUy6QZYxfmdtI9WxoxgqEc9e3c0lqYzwsWK6cGzNam1R6YRVYbC5WLWHIA9ASLSJwZ4eKVKsKRpq6svLcgLtDXi9osOt7tdTIGhCB9QZiwNpAhQAT+1sd53jkMb1+ztPMU7gLUHu1FADA3FyLkQTI8ZsYirK9WTj2X5EftSK8EljyFE8GSoRUp/qnDe00kd4FSSpVjCmCAYIbmNr4W8lVZK1ahWYd9mfXaG6XMAAxHS/TB7jOfqpUalUnUANOgCWIvqBUT0tHITilwTs5mMzmDVZAkD/iSf8AtkTcGPHCaffmM+O3n5EyqU2t9/2WH4flXVgQNaAqqyQrECRbabXI2xd7I52oNSrVsrhKbmCGLKx9kx3KixVgZGu8i2BHbXMVaGYSi9NYsRVUHvgyRI5QXifDByhwz2OWUFYb2z1GFryUHImxU/8AVjp76Ku/TyKvtDUwVG8Xl2E/tiMx7YGuoDse64Mjc7NHu32PL44K9kXNH9Z7NmFQQ52XSP3V3O2+L3bPRWpBr+0WxPUbqT4wd+oOKfZnh7VaZc+07o9mqq/KQGnZe7a+9rA2xzrb6OR9Bq1Vh4lxh/ToyT9JXE6GYyoVRLKAQ0CVuNxykWwK4gDmeG0M3E1KH6qqZ3WdMnyfSfJzgbT4DUzFSolI7EiSRe8AnxODfYzLVKYzeRrJpFSkzAfstA0sQR4FD/TjQ0DhTTpqV3z5kHtHTpSTgsW/Yk5s2kxY284+zgbVSJGw+/hglmqZAZW94EqfAgwfK4wLzzDl4fGMabMhFSu1/QfQYjGN6puJ6YjwBifl8/riSmLDbEVP7+GMGAMdLSiSoJPQHzUQfmMEshRA254H5WogWoWMKrXJ8QD+eKg7RiZpglF3j9roJ3HXltucchTp3ZKuEqspEmqujcW3vA8gJxW4vRLotri/zYR8gZ8MQdiq6l6JX3XKFfWAfhMehG4uw1063EfOW/thgChkOHSDqBm4/P8Axjnv6Sas5laakxTpgerEvb+ll+GOuZhSGldtj+H+P844x29qls9W8Cot/Cir6e7gS4JKK8QJoP3lBG24+Q2wz5rhZdFZV06ibbxyi9/jP4Yo/o/ySVc5TFT3QCYnc3j547TxDK0aVKmKpUS5UETDTcAbmbT/AE4x9bqnTmoxV2lc29HVjFWnm7tY5dluFPlF1hNTBZYMv7MxYMLEETOxBw25HP0TlKT2amvdfUFMCDJaAZPofK2CHaIinQLfuhgNZiQeX1xz/hdAGm4JMvPs4NpPQSATA25zFpxW09Z6iO6S4ZadKErSgrD52DzB0qukqhd33MDvd2T7oImYET4wcFePV1K+xcKrMW3AcBCSJFveur7QDPScKXZjtLpSmjoFlt+WrcEgmRO8+IwboVTn3LLNNZ9mWkGTAJAmwkXtMSfPENpKcsdeeRJ0vFvkvDYTOI8CK13Fgx7zFlJtdYCkxJgcjuL7jHROy2So06CTpGg6mZhDMdgZER5RipxChqa9MmAywLkEAFS4YKyEhlJU7H44p16pTRTanrV7HcEH9m0bb3nCamvUk1F/buN7qnUprbhhrjHEfajXSDEaYVrAMeYBHSD64YuA1i1FSReL+YwtVuKLTpimdKgKNItJE2F+fz3xY4VnNZ00mgrpJuIkwYXmyn8cHR6i0m2sGRqdDP5ksCt2wpItZKruKYV6cP5jSR/zKP8AlOHqpmhSyz1UD1IQMFUEzzkGDYyJidtscz/SnUNVqaPFPvamXvE6pIt++sHUIG7mcNfYTtVTKU8qq6fZ09OqQB3bAhCSRMbFibeJxpUKatdvm/oItPVhBXWFn0GupTWrSWsyBaiggN7MsyiRYDckjYXklbHYje0xQUEqMRDwAejESJkDmoFwPLFHivbWnkmp5eq7sQFDVlVIaFEyBYEyCQBacJva7j4cQlVqgBLOzMCSdQiIAWy8gNhg1oxnT2u9+Pt1DDRTqu0sJ574I+N5gjWhEGD5EXj5aT6YJ9jqFcZZjTTWpJOkeBB62MyZwkcNzDM+liRTYSoNgTsJaCQJ5DHY+x/D0WnoCHQ5ubgNaDt8cZ1WCp2pvqSafSz0qlN2a6eYC7C8GmpXqMkMWY94e7J1bHxPTlghxugtOvQqkL/uCmdripKQRzGph8MMmcyqZepUzPtAquFDI0ASJEg9Tb4Y5v2244lbMZWjRYOVr06jlTIEMLEjc848MJ8PU+Mhb1fSxZlqHU3T6Wt+OBH7fZX2eezVMWGssvIQ6h//AC+WFOu3dGOgfphMZ9v/AIKXLY3+O2OeVzbHqzDNH39B9MRxjb8seDACeqbHG5xrSO+JIwDgxnc09eprJ7pjSo2HS3M+OLeXdadPUbmR3RMGep6csDKaERIggQRbcfTBfhuUNWotOwi5jYxYeVyL+vjhkhWx67G8eX/UZekKUU/aJDb6WJItpHumVImB73njpNWJYeH4tjmXBsmtKvQaTAq0xpOokEGfgSRfYYf+N5lVqFAR7TSzqsxrCtBAJ/mHyOwwWciE0JaRbpji/bnL/wDv8wP4xA/mVT+OOzPxBAWAuQYI2v4TuOXoRaDjlPb+npzxY31im2/RVX6ofjiKq/CW9Jb3lmMP6PMhQW9RQrxpk2JuPd2MyQJHhjpNLhqmlcvU3ZdREjwEcwMK/ZumjFZEhbi+xHOOv5Yc6ecp0gDWqIinaYHiBJNzjMnTU/nS+pPKTUvDf6Fatw2k1NUejrL7jTMeJJuBgFS7F00DU1ZipMj3bEwIFpiF353nDhTzAIm6kmeXny+GKz1wo7zBjqJmALSSBHgIHUxOMjU1ukHZeWMD0q1WL8JxXtN2f9gtSoFqLTWoUZamnUSD76kbqbb8jhi/R3lqlSnUIOnUkU0JibLqqKxBuCYBA5jFL9I3G5D0lGpWJa5W9tVx0FrHfEv6NuLE0CrstP2QI1ESCJGkRubmbc8aFFynSUpd/wAF+rOoqe18tHR81WNNoZBDSbBiZECTpFxEDHOu0+erJW1oICuVFlAJJnkTKkG2qPEbHFftWM6cyXo1K1Wm11IaNCm4F+7z3jUI8MDsnnGSmKVcvUqMQUJjSokSLiQwjne5xHKneV00126h0dJxkrq/f1GfM8FfMulSqrKgAAGoLfSpuQ2ppN9QEbeMAs5mamSrKoPd1yNO4HdB6A2AscdD4Kj18oHOik4JVXADNoBsb+7MTBnf1widtsvMHVLKNyBIIG8rzn7titGclXUZNbWuCxpqjm5QfTFgHx3M0szmGrMzqXI/oCrFrkQTB5XLeGK+eyKpSpVaUpVDS4lxzJBlrAzOxvJtiHh2ZprWphr6WVjHutBBO58hB+uOidoKQq6Vf2Cq6l1XW2pgAJEGwuCbWsfHGjKq6bS8vwNOFLwxWE+t+H2OXNxCrXakjMWCNZIJC3HIXNsTVahdSlQFGZtVxBO9oMAr4+HO0WaOUehXQhgq1CQ0GComBbcbWP5YP8R7W5dSVGXWroqzreNpAYgbm43PhiZ1LtbVddyrNSpSaf0CXZvsSr0xXqsQsd1FvpXcG0lm5+u2Gbh2fagRTZopEjQz7i8kWix8YjF3KZmgzVWRnZ4CuultIAAYC809WmqP5gOeknFDOZgPTOldTzHIaTzudoF7dLbjGTqtyqJt3RBGq6qaksfwM/FWJpqpo+1lgGAKwBI70ORIAuQL2tOOY8e7KUqOfyrUU0h6yFhPdkHVCry29Iwb4b26oUF9jU1n2YgNvIEXufHFLJ8cbN8UGiTQpKdJ0kd6ATvv7pxsUrbY7X2K0adSm5KSxZib+mJh/ryIv7Klz/n9ByPrjn2aGHX9KOY18RzJ5KyUx/Qij/u1YSszjRMshn6Y3I540PLyxtjhke0tjjGP0H0GPaQ3++mNWGAcGAxYkxv5/P54a+FKwpBixUv7oOxM7gAGSY22v1wraJYFYg/L0++eGPh1dVCQC0NJmIJAgGItFoP8OGXAjGjhpqa6emE76Bu6bgESIt3rRBsJPXDN251ishTcFyD0IKwQOZv5X8cJHDK1T2lOHbTrQGDP7Q/PxO5nD922YrWRlmQakCTBMqIMb/2weQcAbOcZRENWrCsAZpg++xJuvQG2+1/CUztC3+odKlQ7P7NoEQCNSADmsB789JOLPFyTrAUmYlQPe8b7wq8jBIAI5DP/AE7VTqwZNRSyiZJZLrebEwyf/YemFnC8WkSUqm2aY69nylMKogLAjCT+kbiDNmnhoCgKBMmY3HQX+WF2r2mqmkEViOU84G1+Rxvksu1V9ZeTOptXOINz5YzpeFXkbWkoty3XydJ7MpnhQWWQ01WxcEkEQCARyAJA3Jjli6nBxm01PyLGwYLqBAMcibnzBOJOz3GJp+z1AMIAU27xMeoM7byPEYPnh9HLUFCg9wE3JNzJYmTuTJx56rUak5JWZNOpKEttst4ZxXttwt6VUmCAzEgTJ/xgv2X4hRZCFQ02VUV9R1BiJvB2kfQY347SbPNTSmoBZjPMwJk7wAeU4VaerKZqpTYGFYqQdyQDpPjc78xjXoXqULS+ZE9V7ayUuev/AAeaHaRqa1Kc6lIlSQdQYkiOkQD4T5xhcp8IepUQILFitp+fSNvMHwxj1izgo2naT4id+m+GrgGVZiqqCGkFbECbiRJjkR0xBKfu1dLLLt4pOSSXUPcB4pp1UCwWdWmVMnlt+1cD3TF45jA7tbkf9xyQo0ljKRtN79SPh4YaeGdkk7j1CzVLyQ0bmQJAmAOkYBdtz+rJQ69Ii8lZ5kKbt/USPrirUouM41Hi7t5mLU19OlUcoevmzjuULh9cKqk7ki89BufMY7BkAtOhRrlVV6h0BniBI1ftXGrTMDkoOErsh2cbMV9dYSoMwdienlJE46D+lDLIeEs+xptSZfMuq/NWONOpTVd2T4KNLXVJSUZcNi12k4cAHNTTLEldLat4jcA7gjn4b4Zux3ZDKQK4p6mYSS19Lc9M2EGRtjiNbOFlSWLMDMSbRc77+GOg9kO2VajThgCrAkfwEzJiDzvEdbYFOj7leJ3RqajfVhaLyjpVGvRWqaVNkK6XZRqDHWGZamkaiXALQwNlgAc4o9q+DJ7FnRamtRqAQ3Yi8Q1iSJF+RIxtwGoF/XFtTOHtYBSW1HSehJAuZMAwDM2+0HEXpwAmoEEnfYD4fEjFiTp7W5fx3MiO9Tsji/aHh7LUYNOoxvHPYGLbHDT+i0hfbVXEJSWSx2i5PkQob/mwA7V8SD5pywgEhVEgd0bHwnBftBXp5XhRoqf1mZYNG0Ix3PMSiQPHB08E5JdEaeqrtUPFy/8AWc34jWNZ3qv71R3cz/Exb8cB82N/T6YMV0kef2cDM2kardD8jjSZgIpfljwY9P5fQYwYAyJKYsfPHgXGIbHzxvpwBghk6gBBE3A3jp5+GGThAVgCdJ5C5mR+U/TwwqUpJJJ7wJ+5wXyVNmAIMd0g2FtvQzt1BjBQjQ69l6Bq5mmFiWqLyPuhgzWPRQTPL1w79tiY9oFkKzE/wg84gzePDqYxR/R3TCUKzgd4slObH9li0NAN7TtsMH61SMHhnWujnFwSFAZz+89t7zE7Hp0xZyaFUBaVC6YsB06kkCTAANgPXAjOq6ZiuoIADtEWMcvl99GHg2VQpsColriRcCdx6mBfUOpGGIxB7YcJ9jmAwXTTrd4eBtrHoTPSHXFQZlhKrct3RAvcjbD/AMfyK16LUtQZraSIkONQXyB90gWudiLcyy+cNGspdJNOoCysP3SJBHW22KtWld3NfR6tRg4vkfuzvCq9Cuj1hsZIeYMLyiQSBa9hHKMOnF+LtXosio4Zu7FSm4ktYHvW0/e9sQZLO0c2NY0kMoIOogzPKP2pAw1ZWiCqU2IGmDSjcaeZtHMCOmMeem99O8ujVvuWqmritstuUK3AuCZjLK5cJqqKFULLFYJZrxaQPkL7YRf0gZT/AN7qXaoqNPkSgJ5CQgPrjsFJKzBA8OEkM50w4Ia8BzIJAtaNQ9OV9veHoM3qSSGK2EAAwvX3TJn188dHwahrhWK9OpKrqXN82z2C36NuEUqtQswIIgwRKtB3g8pjHRsvRZqrHQEYCzAEggM2nvQASQLqLif5The7GZJqeWSEioSamz6WE/v2ube9Ju1iN3LL5yk2gMyBzK6dQ96O8oIN2BBFuhxPGkp897/0Lq68pSdvp/ZXp061SjrZWpVTTI9lrGkMQwmVHe3tNtrA4UioYxvh0zOZFJCEZe6dpmJ70XPQgxOxHKMK/BNFavV9qDSYtqQKwh1/egiVN7gEj4xilraUa04xjLxLoyi9PKcdyWEWOE5BUgKIwkfpn49Ip5OkZVP1lWOuyqT4AkkdSvTBL9IHHKlFjSpVxTUjkQDz3YDUCQJsIvzxzPI55GqA1wWG5kxO/jtN/QYuaak6aNDSaHKlJ/T/ACb8B4HUqLquqlgLAkm/7oEm+GyplqNJSul5BO5iDBEb8xew5YrcN47QorquSRqUL+yQDv1BF5xe4bSOaZq1QhEIsJMNykzaMVa86kpOUsRRuRUY3ingceA0aFajoU6faoriJLKtramFthaxG+J+1PEtGWqVFv7LeTEkWgnncjCrR4tUy6NUWpR9msU6dIc+lg0zEwD8cAONcXr5lBlwNOtpFMDvMdxM7sTeOuLkZJw2vr/BkvSy95uXBU7P8OOfzYNQd0QznkE3Mkj08ZJ/ZwP7dcbWtmnIuiHSgHQWt4QBbqJ54b+JuvDMj7AEnNZhRqIPuLNzMbbqLXJJjfHNqUA2AneRGNKjBRjYztXX3yxwbMxmTYch+JwMzrg6o6j5AjBI1rEEfS2BdemArx1F/TE7KhTff4fTGuJKm59PwxGMKMS0efr9Diakfv0GIaPPE9Lb4fQYDGRLSpbgeZ/zg7wogK3Mc18LiY8MBlmSJ1RsPv72xdyLkNsLdP77XwUIzr/Ym2TO/fzD/JKQ/E4NVntgN2Wf/wBlQsBLVTG3/EK/+GCreP38MAZcHOu1XdzVUzuFbT/SAefhgp2cNRJJNiZVSzdRNjJssbW3tgf27o6MyvR6QP8A1Mv54s8LZ/YQj+zdiCCRJF72JESsCxG9sOI0NCpq0MQFM95RuRcWJiRqAIMCY6E4Ve23ZYZkNXoqBUUDb/jCLQObQLHmJH7IwzQ8BFgSQAVJGlQu3OxKkSALGN7YJ0AS2lXA0/1eAldhaRP44LygRbTucQ7OcbrZWpCTfdfHaR4/ljsnBeO1HCqWGtgIG7E31dABEHlscBO1fYqlXU18vpR13BICuQY3mFeRzsZv1wu8D4t/pS3tdaMGliZs3MQfd28uhOKVaFnctxlvx1H3txnWoUlYL/t1BsI1BhLRJg98XibeU4RDxY5mpPsyp94yZnSBz5cr4ztF2lGaAAYkAzfy2xLw7LKVUoysxvp2kiDHnzxm19t9zWe5t6Og4RUpc/o6DwJ6hWnTDlVG5EW27twDBN9hAjyx52tytZVRwy6aTh4IMkCCCTzhhMDl44rcB4kZCHSKkiwkAxP4YZeOIjUipNouATyPUERcYy6mqnFX7P8AHkR1FsrLCs/yD6faHL16TVC0AAKUJAhupEWMwLmLDCPnuMVCzd0qwsjciJB25/2wudos0yVilJjBI1AAEG/MRe5+eHPL8LzBy/62kq1dMr3xLgAWgju8rb7eWJ6kNtqrtn0aL9GnQoSaznuIGbzrVpFQNUqA90GYAAMkxfkB5DfGU+zVT2XtXQhChIIIHSBvPQzHXE2Y4VXp1gzC7XECRFwf8YN5hazuhq1SaQjubAE+7MfxQPLyxelX2pbWs/7g6dPc+MegAzXAneoiJqZyBrAEDxNuUiMF8pwTMCkdTaV5ggiABtHX+22Or8FFBlFUUkBYCTALGJHK0XJ63vGFvtVxoFTToUi7kgBFAm9pg8psenOMVZ6irUtGCTK0K0XNrba3Lvwc0yvEmpOqIJqKSJG7aj9PDrhuTN/6KkK1VQ2Zq/7erSNEgSdySbnly6G4bKCjlCah0V80xjcGnR8h/wARuU7XjrgRnc29Rmd2LOTMmb+G8WE+Hzxs09MrqTM3V6694Q4/Rc45wuo9Bc7rZ1ZmFSQdSVLmCP3SCI8+pwu8OQszGZXx+h6H8sOnYfiaCpUyle+WzI0MCDCOPccTt0JHgf2cB8/wVstmKtFhpZCRY+9F1aNhIg4urmxlMHVGHuiBe8j09DNsAs2g0uRfvb/HBTiQu03E+XS2A2o+zbpI/H8sdc5IrVbMcaHG9c94+eNcAYly4s33yOPXqRHkPpH4Y1y5+uMqAW8hgBXBPQe888EcqpLWO3w9fDfAVHwUyOYK+I8/v1wRWdP4B2goUctQpuwJVWmOpq1G+EMMGKfbHKxHPrqGOa0sslU94FY5ibep5YvZTgVEMAzvcE7DcaSRYGTB+YN4ul7vA6dkGe3HEKeZrUBlxOmmQfMuSL7YvvQ9jQuBZDYazsLkqs7RN7XmRgflKFKmWFNWkBT3lOogyLDmPlv6X8jnO8w1CS8BTAKiywRqM3ny1XAvh2sCbslmhmmamr1aYUDQwDBjFpM2BKwN43E3ODuXzCqVN5bbvTaBNzyvJO1wTgbSdWWGNOYIIixAaIIEkiZi4AvMzBmXMFRc3A5gXBO8mw/Cb7jHRjYEpXDbMs6tI1TpuRsCTYCQP3usDlgHx3g1HMWdW1H3WsCoEWnZgTyMjfnGKWRzSo8KAzVCNR7oH7Vo5RIt4zzuSz2cA99117gBgDbr3ovbcczYgHElk+RL2eDnvGexlajJp/rFie6Ljzpgk+q6vTC+5qIQYIZTYjl6jY46lmM0jL3mUA903BEAGQQTB+H1wMzWWoudUAnky6lJ33KkFhN7k4rzoJ8GhR9oTirSyihwftKzVqRqEMVJJMGwgjYeJGGbj/bmmaLKQbjYj5cp88KVfJqpDUyARMFgGIJ2AjSQInecDc1k0qXqKQOq1dzI/ZYCBfrjMqezFKavwX//AEKMvE45XBP2E4lTfidJ6x7ssQW2DBTBPICR8Yx2ziNOmJqLdiADeQVve1pvv5dBjheU4PQUg63WDYkgH0h5+IwXXN0gmn/UVWUKVWarbGJUFEYxYddsLrtBKtZRwV/iIylvk8jjxrO0qcywgMYEzYi/wxz7NZ+rX/V5ZGciJYARv18JHjbzxNWqUIkqrHkX9rV+IqGmAcEMpRGZpmjRqutaJSkwSmlQAElV9mT34BI1Hkb4bSezFSzJ3ZJV9o+DbA04RWGXUjMZlgT71GiQxOwuRYWAG84rcQ7QNV1LSX2NM2IUks46PUNyPAWv64A+yIt7t9iIuOv39Mb5iRaRebjzvtGNKlp6cXuSyZ9XVTnyyZYUXgf3/C8+hxlOkrbSTZtrWj0B5f5xDlm0wLyLD879Pjieq7C8X5R/jx2xYKxItMCZFjtIPgL9bj4Ya+O1RmcimbYRWy7+wdv310yjT+9cD1OEWpmwbyRA35fdjhq4wP8AT8HSi1quare30HcU1ChSQb96Af6hhJPsFIQMzmtTSP8APpsMRsg9ifEj8cQ0CSTbrf4dMW2QBFE7nx2+zhUOwRW95vM/XHgxtUEsfM/XHum331wzAj2j+P5Y2I28se0F97wxsQMKMlggZYJnqcWMvE8okbso+pw2OlNmdgiwG6C/PlyxHSqCNXs6ZtMFVtB5krYRePHC7xvdMFZNNQMMAIAILL+Y++l8NOVaq0DUjACC2tAY5SDY+lhijUzmjvGklztCQCd47luXliqvGqgiAo3tC22Ee7HXlhbsLgMY9pTZdLKwURZ6YNhCjpbHuXp3ZyqBjzLoL94cjsbTt+OFpeIGSxpow6ARFwOXrjf/AF7g2EdCNunux88FNoVwGem7L3l0hmgE+1WLLHdBIBOy79DuMU83nKpdrg7wC6gKJuJHdZrkCCRBN7AYE0O0FRNSaEIE96ADsDv8MbL2rrMNTpSblGhRG95CzOG3MGwLJUqDY0lI0mfbJJi14YhpG832Jm2LK131qWqU4Iv3lkN196AAAOUm+xthePad4b9RRN/3Rz0228fni1V7VI0AZSksHcc7TJAUdOfXHb2d7ss5rWxlSo2j9bREcrGTpkETtebRiEe0WJKTYQKqRFpmDPIefPpiieLITP8Ap0gkWDsN9XytNsU//U01XozyjUfHw5m+GVQDphOrUZtJYLcXGpOm2/pt06Yw5g6CCqRabqekgd77tgYOMUFjXltryruJEcxqgnxxC/F8uYC0DyuztJP9LAR4Y7cwbEizUcbqxvNw6yIHxA+BucVkzO0qrQBEkSbC+99+n0xrmuJUbRRi3U/i1/XGlLMZeL0qmo/xCPhgBsTniLAyFQAWuAYn63xJS4rUU650srAqy7hhcHbqJ2xUNWhDDRUkHqnScRP7KR3XvyJFrkefLHZuG2Bz7QUfbURxGkF9m5010Uf7VURJ/keQw/mB52Ua9admAI5zHhy88GOynaNcnVdWpGrQrJFaiYh1OxE7OATHmRzkMFT9H+UzINTIZmmyn/g1nKOk3gmCeY3Hqd8G4rQkLnNIPeWetj4f3xNkjVquKVJTVdj3VUaifhsPE2HPDWn6MUpDXm8xTpJ0puXciNhIUA/83ljzM9q8vlqb0OGUjSWwqVzeo97Sx2HhtewGOudYsUeHZbhoFXPMlfM7pllIKIbQapuGIIHdFt/e5J3GOPVszXqV6rqWbrcAXAAHIYgrxqJcMzESTquduvifnivR0GYDWn9rpH5/LA5DY99ssW0g+EmPLljMi2qoBFljcHmwk/LGhgaTBvH7R54sUyFYoAQIkwx5BovPWMckEGrR5+P5nn5Y2FGfio+P+cW6qxbaFmR4g/8A9TjUgK0Gw17/AMpW17bTgnWKeTEz98ji1llkG3M4gyK90/zD6HFrKGx8TPyGFkPEO1BC145M3ypgi3nidMuACZ3gffoTj1x3qtucna8rf1j64ykSaeocgCfIAE/9M4r3LNiGogAAa8yY8+eBL0GJDDaYnzOn6n54PvkwWAeTYc4AMC9rnBTJ8EoGmVYsROocryDBI3Xyg35xiP4iKZWnXjewph9KNtt+A+hJx5maghRN5M+gH44YaoFFHGmnq0sUY01aDtcuCbkQfCMeVc3VfJJUSqy1UYNU0Qso56KI7vd9NWGVVSyu4q1ELCtUfuliQSQZ9eXw+uPamyjmWP8A5f2+ON07T1wYNRmE/tXHwM4v5bi1CpHtaVM/yqEPxSDifxdh/eQBQMav5x+H5YlVbtbY/hg7/wCh0qgmjUIM6tLd4G23IjzvgRn8rVpMRUBFzfkR54VvoOmmsGFToiL90fh9WxFSpgkmOQP/AHH8MSPW2EncfJhiBKkxE7fgT+OOQWDM5uR0AHy/PGZSnJH3zjG+a/b53PzMY9yyzAHNfnJH5Ym6ENvEeZgyT42HgDp/PE7QDPRZ9bfnjdacif32Rf8AqH9sau2oVDyAI+/+XAuG2TFSASRNpI9WEfL5YkztON+Wgf8AUT+eMzZ3j9z66jv1viRpauZ2H4RBj54Fw26HtWkRWA/g/FsS0QRUJBg9R4ADHhfVWUkxAiSdobE1FP1t/wB0kjzj8jjkcyPOsSQCx5bk7yOuPKaABlt48r3I9bH4Y9rtNRehM/BTA+OPXtUaQSApsB4ONvO2OAeZhNRJ6IY85T8jirlqNqhn7Kz+Ixbp52mwIBjflfZvxI+xiDL1baIHem8xFoHnYY5Xsc7XPDSlaHiF+Oo/niy6XqNtAg+qOfv0xDmHAo0oMlDt4XPrvGCGapf70bFQQP6XH/kPhjrhsDc1QlT5heX70R8CMacQp9wuP2iW/wCuqB8lX5YvVVlyu0srT/FKED54H5v/AGSByFM+hNX8x8sFAI+F05Qgfvj6YmejZf5RjTgJ7rfzDF5aeoCxsI5csLJu4yV4oIK/66oN9TLv5Mfw+QwV4FkSaTvCtpFTShJAbRpnUQCY7whQL9RzzGYhfH2JG7fkBcTz1dIZyh1iECgAJ7sWCiwUQB44j4NxTMNUj2vcUjUCoMg+H9xjMZh3Tjtbt0M58jhopVVZmQkLoETGouGIBI2Wxki/TeQB4O5OZaiwUCrqpkIIUBgQIHIAEW8MZjMZ9LhkT5Ep5N5iwxNXUCnScCD3gfEqZn1DAemMxmNXt9f0ToI8LzrgSDzjDhw7iS1waVZNQMA+vjy+98ZjMF5TCsSFftLkTl6ukNqVpZZ3HUH4b4D0aht5fgBjMZiOHyluXJDXc/G2JsntJ+53xmMw74I18xuKn+34Sfmf7fDEqiFYdXK/M4zGYAy5LOY95RyIafQDHqqPakDkCPmPyxmMxw3UynT/AFu+34ufwXFymP1zdSi/UjGYzAYq/ZUUxUQ9Qw+ER9Ti6q94nkSZHow/8RjMZjmcgbSohXB6KeXTV+GMp3Annf5H8sZjMOhWbC6L5E/L++NvakA3Pj4gL88ZjMAYmFU6mm5FRr+Q/LFDNoPZ2/dA9Nx88ZjMBcgfBJ2eHdbzj5R+OL/svoPmAfxxmMwj+Zjx+VH/2Q==',
            [new Ingredient('Buns', 2), new Ingredient('Meat', 2)],
        ),
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}
