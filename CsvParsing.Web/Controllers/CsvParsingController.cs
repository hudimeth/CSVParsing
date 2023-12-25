using CsvHelper;
using CsvParsing.Data;
using CsvParsing.Web.ViewModels;
using Faker;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Text;

namespace CsvParsing.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CsvParsingController : ControllerBase
    {
        private string _connectionString;
        public CsvParsingController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getall")]
        public List<Person> GetAllPeople()
        {
            var repo = new PeopleRepo(_connectionString);
            return repo.GetAllPeople();
        }

        [HttpPost]
        [Route("deleteall")]
        public void DeleteAllPeople()
        {
            var repo = new PeopleRepo(_connectionString);
            repo.DeleteAllPeople();
        }

        [HttpGet]
        [Route("generatepeoplecsv/{amount}")]
        public IActionResult GeneratePeopleCsv(int amount)
        {
            var peopleList = GeneratePeopleList(amount);
            var csv = GenerateCsv(peopleList);
            return File(Encoding.UTF8.GetBytes(csv), "text/csv", "people.csv");
        }

        [HttpPost]
        [Route("uploadcsv")]
        public void Upload(UploadViewModel viewModel)
        {
            string base64 = viewModel.Base64.Substring(viewModel.Base64.IndexOf(",") + 1);
            byte[] csvBytes = Convert.FromBase64String(base64);
            var peopleList = GetCsvFromBytes(csvBytes);
            var repo = new PeopleRepo(_connectionString);
            repo.AddPeople(peopleList);
        }

        private List<Person> GeneratePeopleList(int amount)
        {
            var peopleList = new List<Person>();
            for (int i = 1; i <= amount; i++)
            {
                peopleList.Add(new()
                {
                    FirstName = Name.First(),
                    LastName = Name.Last(),
                    Age = RandomNumber.Next(20, 100),
                    Address = Address.StreetAddress(),
                    Email = Internet.Email()
                });
            }
            return peopleList;
        }

        private string GenerateCsv(List<Person> people)
        {
            var builder = new StringBuilder();
            var stringWriter = new StringWriter(builder);
            using var csv = new CsvWriter(stringWriter, CultureInfo.InvariantCulture);
            csv.WriteRecords(people);
            return builder.ToString();
        }

        
        private List<Person> GetCsvFromBytes(byte[] bytes)
        {
            using var memoryStream = new MemoryStream(bytes);
            var streamReader = new StreamReader(memoryStream);
            using var reader = new CsvReader(streamReader, CultureInfo.InvariantCulture);
            return reader.GetRecords<Person>().ToList();
        }


    }
}
