using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using JewelleryWebAPICRUD.Data;
using JewelleryWebAPICRUD.Models;

namespace JewelleryWebAPICRUD.Controllers
{
    public class JewelleriesController : ApiController
    {
        private JewelleryWebAPICRUDContext db = new JewelleryWebAPICRUDContext();

        // GET: api/Jewelleries
        public IQueryable<Jewellery> GetJewelleries()
        {
            return db.Jewelleries;
        }

        // GET: api/Jewelleries/5
        [ResponseType(typeof(Jewellery))]
        public IHttpActionResult GetJewellery(int id)
        {
            Jewellery jewellery = db.Jewelleries.Find(id);
            if (jewellery == null)
            {
                return NotFound();
            }

            return Ok(jewellery);
        }

        // PUT: api/Jewelleries/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutJewellery(int id, Jewellery jewellery)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != jewellery.Id)
            {
                return BadRequest();
            }

            db.Entry(jewellery).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JewelleryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Jewelleries
        [ResponseType(typeof(Jewellery))]
        public IHttpActionResult PostJewellery(Jewellery jewellery)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Jewelleries.Add(jewellery);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = jewellery.Id }, jewellery);
        }

        // DELETE: api/Jewelleries/5
        [ResponseType(typeof(Jewellery))]
        public IHttpActionResult DeleteJewellery(int id)
        {
            Jewellery jewellery = db.Jewelleries.Find(id);
            if (jewellery == null)
            {
                return NotFound();
            }

            db.Jewelleries.Remove(jewellery);
            db.SaveChanges();

            return Ok(jewellery);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool JewelleryExists(int id)
        {
            return db.Jewelleries.Count(e => e.Id == id) > 0;
        }
    }
}