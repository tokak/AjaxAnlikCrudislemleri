using AjaxAnlikCrudislemleri.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AjaxAnlikCrudislemleri.Controllers
{
    public class HomeController : Controller
    {

        OgrenciEntities db;
        public HomeController()
        {
            db = new OgrenciEntities();
        }
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Veriler()
        {

            var veriler = db.Tbl_Ogrenci.ToList();
            return Json(new
            {
                Result = from obj in veriler
                         select new
                         {
                             obj.Id,
                             Adsoyad = obj.Ad + " " + obj.Soyad,
                             obj.Yas
                         }
            }, JsonRequestBehavior.AllowGet
            );

        }

        public JsonResult EkleJson(string ad, string soyad, string yas)
        {
            Tbl_Ogrenci ogr = new Tbl_Ogrenci();
            ogr.Ad = ad;
            ogr.Soyad = soyad;
            ogr.Yas = Convert.ToInt32(yas);
            db.Tbl_Ogrenci.Add(ogr);
            var durum = db.SaveChanges();
            if (durum > 0)
            {
                return Json("1");
            }
            else
                return Json("0");
        }



        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public JsonResult SilJson(int[] silinecekler)
        {
            foreach (var item in silinecekler)
            {
                var ogrenci = db.Tbl_Ogrenci.FirstOrDefault(x => x.Id == item);
                db.Tbl_Ogrenci.Remove(ogrenci);
            }
            var durum = db.SaveChanges();
            if (durum > 0)
            {
                return Json("1");
            }
            else
            {
                return Json("0");
            }
        }
        [HttpPost]
        public JsonResult GuncelleJson(string id)
        {
            var Id = Convert.ToInt32(id);
            var veri = db.Tbl_Ogrenci.FirstOrDefault(x => x.Id == Id);
            return Json(
                new
                {
                    Result = new
                    {
                        Id,
                        veri.Ad,
                        veri.Soyad,
                        veri.Yas
                    }
                }, JsonRequestBehavior.AllowGet
            );

        }
        [HttpPost]
        public JsonResult Guncelle(string id,string ad, string soyad, string yas)
        {
            var Id = Convert.ToInt32(id);
            var ogr = db.Tbl_Ogrenci.FirstOrDefault(x => x.Id == Id);
            ogr.Ad = ad;
            ogr.Soyad = soyad;
            ogr.Yas = Convert.ToInt32(yas);
            db.Tbl_Ogrenci.Add(ogr);
            var durum = db.SaveChanges();
            if (durum > 0)
            {
                return Json("1");
            }
            else
                return Json("0");
        }
    }
}