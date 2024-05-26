using feladat3.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace feladat3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VersenyzoController : ControllerBase
    {
        private readonly UszoebContext dbcontext;
        public VersenyzoController(UszoebContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        [HttpGet("GetVersenyzoNev")]
        public IActionResult GetVersenyzoNev(string Nev) 
        {
            try
            {
                return Ok(dbcontext.Versenyzoks.Include(x => x.Orszag).Include(x => x.Szamoks).FirstOrDefault(x => x.Nev == Nev));
            }
            catch (Exception e)
            {

                return StatusCode(404, e);
            }
        }

        [HttpGet("GetVersenyzokSzama")]

        public IActionResult GetVersenyzokSzama()
        {
            try
            {
                return Ok(dbcontext.Versenyzoks.ToList().Count);
            }
            catch (Exception e)
            {

                return StatusCode(400, e);
            }
        }

        [HttpPost("AddVersenyzo")]

        public IActionResult PostVersenyzo(CreateVersenyzok createVersenyzok, string UID)
        {
            try
            {
                if (UID == "FEB3F4FEA09CE43E")
                {
                    var request = new Versenyzok
                    {
                        Id = createVersenyzok.Id,
                        Nev = createVersenyzok.Nev,
                        OrszagId = createVersenyzok.OrszagId,
                        Nem = createVersenyzok.Nem
                    };

                    dbcontext.Versenyzoks.Add(request);
                    dbcontext.SaveChanges();

                    return StatusCode(201, "Versenyző hozzáadása sikeresen megtörtént");
                }
                else {

                    return StatusCode(401, "Nincs jogosultsága új versenyző felvételéhez");
                }
            }
            catch (Exception e)
            {
                return StatusCode(400, e);
            }
        }

        [HttpPut("UpdateVersenyzo")]

        public IActionResult PutVersenyzok(UpdateVersenyzok updateVersenyzok, string UID)
        {
            try
            {
                if (UID == "FEB3F4FEA09CE43E")
                {
                    var request = dbcontext.Versenyzoks.FirstOrDefault(x => x.Id == updateVersenyzok.Id);
                    request.Nev = updateVersenyzok.Nev;
                    request.OrszagId = updateVersenyzok.OrszagId;
                    request.Nem = updateVersenyzok.Nem;
                    
                    dbcontext.Versenyzoks.Update(request);
                    dbcontext.SaveChanges();

                    return StatusCode(201, "Versenyző ada sikeresen megtörtént");
                }
                else
                {

                    return StatusCode(401, "Nincs jogosultsága új versenyző felvételéhez");
                }
            }
            catch (Exception e)
            {
                return StatusCode(400, e);
            }
        }

        [HttpDelete("DeleteVersenyzo")]

        public IActionResult DeleteVersenyzo(DeleteVersenyzok deleteVersenyzok ,string UID)
        {
            try
            {
                if (UID == "FEB3F4FEA09CE43E")
                {
                    var request = dbcontext.Versenyzoks.FirstOrDefault(x => x.Id == deleteVersenyzok.Id);
                    dbcontext.Versenyzoks.Remove(request);
                    dbcontext.SaveChanges();

                    return StatusCode(201, "Versenyző ada sikeresen megtörtént");
                }
                else
                {

                    return StatusCode(401, "Nincs jogosultsága új versenyző felvételéhez");
                }
            }
            catch (Exception e)
            {
                return StatusCode(400, e);
            }
        }

    }
}
